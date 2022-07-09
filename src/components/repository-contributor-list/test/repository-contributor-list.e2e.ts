import { newE2EPage } from '@stencil/core/testing';

describe('repository-contributor-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<repository-contributor-list></repository-contributor-list>');

    const element = await page.find('repository-contributor-list');
    expect(element).toHaveClass('hydrated');
  });
});
