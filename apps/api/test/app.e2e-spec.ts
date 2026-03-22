import { ValidationPipe, type INestApplication } from '@nestjs/common'
import { Test, type TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.setGlobalPrefix('api')
    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    )
    app.useGlobalFilters(new HttpExceptionFilter())
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  describe('GET /api/health', () => {
    it('returns 200 with status ok', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .expect(200)
        .expect((response) => {
          expect(response.body.status).toBe('ok')
          expect(typeof response.body.timestamp).toBe('string')
        })
    })

    it('returns CORS header for allowed frontend origin', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Origin', 'http://localhost:3000')
        .expect(200)
        .expect((response) => {
          expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000')
          expect(response.headers['access-control-allow-credentials']).toBe('true')
        })
    })

    it('does not return CORS header for disallowed origin', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .set('Origin', 'http://evil.com')
        .expect(200)
        .expect((response) => {
          expect(response.headers['access-control-allow-origin']).not.toBe('http://evil.com')
        })
    })
  })

  describe('GET /api/unknown-route', () => {
    it('returns 404 via HttpExceptionFilter with correct shape', () => {
      return request(app.getHttpServer())
        .get('/api/unknown-route')
        .expect(404)
        .expect((response) => {
          expect(response.body).toHaveProperty('statusCode', 404)
          expect(response.body).toHaveProperty('path', '/api/unknown-route')
          expect(response.body).toHaveProperty('timestamp')
        })
    })
  })
})
