import { newSpecPage } from '@stencil/core/testing';
import { RepositoryDetail } from '../repository-detail';

describe('repository-detail', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RepositoryDetail],
      html: `<repository-detail></repository-detail>`,
    });
    expect(page.root).toEqualHtml(`
      <repository-detail>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </repository-detail>
    `);
  });
});
