module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce quotes on snake_case properties and forbid on others',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: 'code',
    messages: {
      requireQuotes: "屬性 '{{name}}' 為 snake_case，應加上引號。",
      forbidQuotes: "屬性 '{{name}}' 不是 snake_case，不應加引號。",
    },
    schema: [],
  },
  create(context) {
    return {
      Property(node) {
        if (!node.key || node.key.type !== 'Identifier') return;

        const name = node.key.name;
        const isSnakeCase = /^[a-z]+(_[a-z]+)+$/.test(name);

        if (isSnakeCase && !node.key.value) {
          context.report({
            node: node.key,
            messageId: 'requireQuotes',
            data: { name },
            fix: fixer => fixer.replaceText(node.key, `"${name}"`),
          });
          return;
        }

        if (!isSnakeCase && node.key.value) {
          context.report({
            node: node.key,
            messageId: 'forbidQuotes',
            data: { name },
            fix: fixer => fixer.replaceText(node.key, name),
          });
        }
      },
    };
  },
};
