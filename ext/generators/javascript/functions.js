Blockly.JavaScript.function_definition = (block) => {
    let params    = [],
        statement = Blockly.JavaScript.statementToCode(block, 'DO'),
        name      = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Functions.NAME_TYPE),
        returns   = Blockly.JavaScript.valueToCode(block, 'RETURNS');
    for (let i = 0; i < block.parameters; i++) {
        params.push(Blockly.JavaScript.variableDB_.getName(block.getFieldValue(`PARAM${i}`), Blockly.Functions.NAME_TYPE));
    }

    if (returns) {
        returns = `\nreturn ${returns};`;
    } else {
        returns = '';
    }

    return `function ${name}(${params.join(', ')}) {\n${statement}${returns}}\n`;
};

Blockly.JavaScript.function_call = (block) => {
    let funcDef = block.getFunctionDefinition(),
        name = funcDef.getName(),
        functionName = Blockly.JavaScript.variableDB_.getName(name, Blockly.Functions.NAME_TYPE),
        params = funcDef.getParams(),
        args = Object.keys(params).map(param => Blockly.JavaScript.valueToCode(block, param) || 'null'),
        code = `${functionName}(${args.join(', ')})`;
    if (!!block.outputConnection) {
        code = [code];
    } else {
        code += ';\n';
    }
    return code;
};

Blockly.JavaScript.function_argument = (block) => {
    let funcDef = block.getFunctionDefinition(),
        params = funcDef.getParams(),
        name = params[block.paramName],
        code = Blockly.JavaScript.variableDB_.getName(name, Blockly.Functions.NAME_TYPE);
    if (!block.parentBlock_) {
        code = '';
    }
    return [code];
};
