import { newE2EPage } from '@stencil/core/testing';

describe('repository-detail', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<repository-detail></repository-detail>');

    const element = await page.find('repository-detail');
    expect(element).toHaveClass('hydrated');
  });
});
