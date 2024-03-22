import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from '@svkm/config';
import { Category, CategorySchema } from '@svkm/db-storage';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  EXAMPLE_MOCK_CATEGORY,
  RESPONSE_MOCK_CATEGORY,
  UPDATE_MOCK_CATEGORY,
} from '../test/mocks';

describe('AppController', () => {
  let appController: AppController;
  jest.setTimeout(600_000);

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(config.mongo.connectionString),
        MongooseModule.forFeature([
          { name: Category.name, schema: CategorySchema },
        ]),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('create', () => {
    it('successful category creation', async () => {
      const response = await appController.createCategory(
        EXAMPLE_MOCK_CATEGORY,
      );
      expect(response).toHaveProperty('message');
      expect(response).toHaveProperty('category');
      const { category } = response as unknown as any;
      expect(category).toMatchObject(RESPONSE_MOCK_CATEGORY);
    });
  });

  describe('createOnConflict', () => {
    it('expect conflict', async () => {
      const response = (await appController.createCategory(
        EXAMPLE_MOCK_CATEGORY,
      )) as unknown as any;
      expect(response).toHaveProperty('message');
      expect(response).toHaveProperty('status');
      expect(response.status).toBe(409);
    });
  });

  describe('update', () => {
    it('update play cube', async () => {
      const response = await appController.updateCategory(
        EXAMPLE_MOCK_CATEGORY.slug,
        UPDATE_MOCK_CATEGORY,
      );
      console.log(response);
      expect(response).toHaveProperty('message');
      expect(response).toHaveProperty('category');
      const { category } = response as unknown as any;
      expect(category).toMatchObject(RESPONSE_MOCK_CATEGORY);
    });
  });

  describe('updateNotExist', () => {
    it('not exists cube', async () => {
      const response = (await appController.updateCategory(
        'playcube',
        UPDATE_MOCK_CATEGORY,
      )) as unknown as any;
      expect(response).toHaveProperty('message');
      expect(response).toHaveProperty('status');
      expect(response.status).toBe(404);
    });
  });

  describe('delete', () => {
    it('delete category', async () => {
      const response = await appController.deleteCategory(
        EXAMPLE_MOCK_CATEGORY.slug,
      );
      expect(response).toHaveProperty('message');
      expect(response).toHaveProperty('category');
      const { category } = response as unknown as any;
      expect(category).toMatchObject(RESPONSE_MOCK_CATEGORY);
    });
  });

  afterAll(() => {
    // return clearCityDatabase();
  });
});
