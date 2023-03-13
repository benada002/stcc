export type SearchItem = {
  id: number
  slug: string
  title: string
  custom_fields: {
    ['IMDb-Link']: string[]
  }
};

export type GetSearchList = {
  posts: SearchItem[]
};
