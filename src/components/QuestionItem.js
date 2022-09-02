import React, { useContext } from 'react';
import { store } from '../store/Store';
import { Flex, FormControl, FormLabel, Select, Input, Checkbox, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const ViewFormModal = ({ name, type, choices, position, formName }) => {
  const { dispatch } = useContext(store);

  // Handle move up/down
  const handleMoveQuestion = (direction) => {
    dispatch({ type: 'moveQuestion', payload: {fromIndex: position, toIndex: Number(position + (direction === 'up' ? -1 : 1)), formName} });
  }

  // Handle delete
  const handleRemoveQuestion = () => {
    dispatch({ type: 'removeQuestion', payload: {position, formName} });
  }

  // Render form inputs by type
  const renderQuestionType = (name, type) => {
    const inputName = name.replace(/[^0-9a-zA-Z_]/gi, '');

    switch (type) {
      case 'Text':
        return <Input flex="1" type="text" name={inputName} />;
      case 'Boolean':
        return <Checkbox colorScheme="teal" flex="1" name={inputName} value="true" />;
      case 'Number':
        return (
          <NumberInput flex="1" name={inputName}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        );
      case 'Multiple Choice':
        return (
          <Select name={inputName}>
            {choices.map((choice, index) =>
              <option key={index} value={choice}>{choice}</option>
            )}
          </Select>
        )
    }
  }

  return (
    <Flex alignItems="center">
      <FormControl mt={6}>
        <FormLabel>{name}</FormLabel>
        {renderQuestionType(name, type)}
      </FormControl>
      <Menu>
        <MenuButton as={IconButton} ml={3} mt={14}>
          <HamburgerIcon />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleMoveQuestion('up')}>Move Up</MenuItem>
          <MenuItem onClick={() => handleMoveQuestion('down')}>Move Down</MenuItem>
          <MenuItem onClick={handleRemoveQuestion}>Remove</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default ViewFormModal;
