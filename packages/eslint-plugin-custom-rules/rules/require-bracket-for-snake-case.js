module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: '要求 snake_case 屬性使用中括號表示法訪問',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: 'code',
    messages: {
      requireBracket:
        "snake_case 屬性 '{{name}}' 應使用中括號表示法訪問 (object['{{name}}'])，而不是點表示法 (object.{{name}})",
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (node.computed === false && node.property.type === 'Identifier') {
          const propertyName = node.property.name;

          if (/^[a-z]+(_[a-z]+)+$/.test(propertyName)) {
            context.report({
              node,
              messageId: 'requireBracket',
              data: { name: propertyName },
              fix: fixer => {
                // 替換點表示法為中括號表示法
                // 從 'object.snake_case' 轉換為 "object['snake_case']"
                const objectCode = context.getSourceCode().getText(node.object);
                return fixer.replaceText(
                  node,
                  `${objectCode}['${propertyName}']`
                );
              },
            });
          }
        }
      },
    };
  },
};
