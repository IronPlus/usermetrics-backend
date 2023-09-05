import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Usermetrics e2e tests', () => {
  let app: INestApplication;

  const headers = {
    Authorization: 'Basic dXNlcm1ldHJpY3M6YkA0TXhIZmh0MmlGR3ok',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/usermetrics-v1/posts/:pageNumber (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/usermetrics-v1/posts/1')
      .set(headers);

    expect(res.status).toEqual(200);
    expect(res.body.length).toBe(10);

    const firstPost = res.body[0];

    expect(firstPost.id).toEqual('post6384fe645aa21_2cbbe066');
    expect(firstPost.from_id).toEqual('user_5');
    expect(firstPost.from_name).toEqual('Regenia Boice');
    expect(firstPost.message).toEqual(
      'infrastructure tidy voyage ditch correspond route gift proud find romantic magnetic guideline coincide rear reinforce modernize follow snack buy penny surround graphic squash network witness golf pressure seem pavement mathematics climb',
    );
    expect(firstPost.type).toEqual('status');
    expect(firstPost.created_time).toEqual('2023-08-22T15:00:03+00:00');
  });

  it('/usermetrics-v1/dashboards (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/usermetrics-v1/dashboards')
      .set(headers);

    expect(res.status).toEqual(200);
    expect(res.body).toBeTruthy();
    expect(res.body.length).toBe(5);

    const firstDashboard = res.body[0];

    expect(firstDashboard.user_id).toEqual('user_5');
    expect(firstDashboard.name).toEqual('Regenia Boice');
    expect(firstDashboard.total_posts).toEqual(19);
    expect(firstDashboard.median_num_of_chars).toEqual(324);
    expect(firstDashboard.monthly_posts_statistics).toEqual([
      0, 0, 0, 2, 1, 5, 7, 4, 0, 0, 0, 0,
    ]);
    expect(firstDashboard.longest_post).toEqual(
      'master confront far grudge estimate balance accumulation dismissal hour rare empire make option rehabilitation computing union hiccup realize teacher release difficult candle arrow climb animal sample contrary sympathetic wood sunshine safety depend smash due organize march constellation acceptance state mosque epicalyx avant-garde buy leaflet blade meat consumption carry palm psychology evening tendency policeman arrow extraterrestrial diplomat barrier reveal scholar opposite superintendent dilute syndrome decorative bench advice water mood gallon patch appetite threshold vegetarian grow tap exact circulation execute reconcile funeral deficiency pest thaw ministry trade angel fixture difficult generate cheese officer hour crude pattern tolerate',
    );
  });
});
