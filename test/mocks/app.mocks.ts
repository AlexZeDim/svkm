export const EXAMPLE_MOCK_CATEGORY = {
  slug: 'сытный-куб',
  name: 'Сытный куб',
  description: 'сытный куб',
  active: false,
};

export const RESPONSE_MOCK_CATEGORY = {
  id: expect.any(String),
  name: expect.any(String),
  slug: expect.any(String),
  description: expect.any(String),
  active: expect.any(Boolean),
  createdAt: expect.any(Date),
};
