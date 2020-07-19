import React from 'react';
import { render } from '@testing-library/react';

import Search from '../Search';

const _MOCKED_COMBOBOX = {
  getComboboxProps: jest.fn(),
  getInputProps: jest.fn(),
  getItemProps: jest.fn(),
  getMenuProps: jest.fn(),
  getLabelProps: jest.fn(),
  isOpen: true,
};

const _MOCKED_ARTICLES = [
  {
    item: {
      id: '90207ca8-97a9-5061-b3a3-8d9b5e5bea7d',
      fields: {
        slug: '/como-migrar-para-o-windows-8-1/',
      },
      frontmatter: {
        title: 'Como migrar para o Windows 8.1 a partir de uma nova instalação do Windows 8',
        description:
          'Quem já precisou formatar um PC e acabou caindo no Windows 8 sabe como é uma dor de cabeça realizar o upgrade para o Windows 8.1.',
      },
    },
    refIndex: 3,
  },
  {
    item: {
      id: '5b82992e-523f-56f7-a0ef-9633a214fd66',
      fields: {
        slug: '/enviando-aplicacao-heroku-windows/',
      },
      frontmatter: {
        title: 'Enviando sua aplicação para o Heroku no Windows',
        description:
          'Quem nunca precisou colocar aquela aplicação em produção para testar ou até mesmo compartilhar com colegas e ficou impedido por não ter um servidor bom para uso gratuito?',
      },
    },
    refIndex: 1,
  },
  {
    item: {
      id: '8d44ee83-477c-527f-b6c4-65028b2ae5c6',
      fields: {
        slug: '/atualizando-programas-cask-homebrew-macos/',
      },
      frontmatter: {
        title: 'Atualizando todos seus casks via Homebrew no macOS',
        description: 'Uma dica simples para forçar a atualização de todos seus casks via HomeBrew',
      },
    },
    refIndex: 4,
  },
];

describe('<Search />', () => {
  it('should render properly', () => {
    const { baseElement, getAllByTestId, getByTestId } = render(
      <Search articles={_MOCKED_ARTICLES} combobox={_MOCKED_COMBOBOX} />
    );

    expect(getByTestId('search-results').firstChild).toBeTruthy();

    expect(getAllByTestId('search-results-link').length).toBe(3);

    _MOCKED_ARTICLES.map((article, index) => {
      expect(getAllByTestId('search-results-title')[index].textContent).toBe(article.item.frontmatter.title);
      expect(getAllByTestId('search-results-description')[index].textContent).toBe(
        article.item.frontmatter.description
      );
      expect(getAllByTestId('search-results-link')[index].href).toContain(article.item.fields.slug);
    });

    expect(_MOCKED_COMBOBOX.getComboboxProps).toHaveBeenCalledTimes(1);
    expect(_MOCKED_COMBOBOX.getLabelProps).toHaveBeenCalledTimes(1);
    expect(_MOCKED_COMBOBOX.getMenuProps).toHaveBeenCalledTimes(1);
    expect(_MOCKED_COMBOBOX.getItemProps).toHaveBeenCalledTimes(3);

    expect(_MOCKED_COMBOBOX.getItemProps).toHaveBeenNthCalledWith(1, { index: 0, item: _MOCKED_ARTICLES[0] });
    expect(_MOCKED_COMBOBOX.getItemProps).toHaveBeenNthCalledWith(2, { index: 1, item: _MOCKED_ARTICLES[1] });
    expect(_MOCKED_COMBOBOX.getItemProps).toHaveBeenNthCalledWith(3, { index: 2, item: _MOCKED_ARTICLES[2] });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render properly with results closed', () => {
    const { baseElement, queryByTestId, getByTestId } = render(
      <Search articles={_MOCKED_ARTICLES} combobox={{ ..._MOCKED_COMBOBOX, isOpen: false }} />
    );

    expect(getByTestId('search-results').firstChild).toBeFalsy();

    expect(queryByTestId('search-results-link')).toBeFalsy();

    expect(baseElement).toMatchSnapshot();
  });
});
