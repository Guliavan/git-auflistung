import { newSpecPage } from '@stencil/core/testing';
import { RepositoryContributorList } from '../repository-contributor-list';

describe('repository-contributor-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RepositoryContributorList],
      html: `<repository-contributor-list></repository-contributor-list>`,
    });
    expect(page.root).toEqualHtml(`
      <repository-contributor-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </repository-contributor-list>
    `);
  });
});
