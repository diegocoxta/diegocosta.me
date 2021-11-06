module.exports = ({ createResolvers }) => {
  const resolvers = {
    Mdx: {
      translations: {
        type: ['String'],
        resolve: async (source, _, context) => {
          const { entries } = await context.nodeModel.findAll({
            type: 'Mdx',
            query: {
              filter: {
                fields: {
                  slug: {
                    eq: source.fields.slug,
                  },
                },
              },
            },
          });

          return entries.map((entry) => entry.fields.language);
        },
      },
    },
  };

  createResolvers(resolvers);
};
