import React, { useContext } from 'react';
import { store } from '../store/Store';
import { Tr, Td, IconButton, Menu, MenuButton, MenuList, MenuItem, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import ViewFormModal from './ViewFormModal';

const FormRow = ({ name, questions, position }) => {
  const { dispatch } = useContext(store);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handle delete
  const handleDelete = () => {
    dispatch({ type: 'removeForm', payload: position });
  }

  return (
    <>
      <Tr>
        <Td>{name}</Td>
        <Td>{questions.length}</Td>
        <Td isNumeric>
          <ViewFormModal isOpen={isOpen} onClose={onClose} formName={name} questions={questions} />
          <Menu>
            <MenuButton as={IconButton}>
              <HamburgerIcon />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onOpen}>View</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
    </>
  )
}

export default FormRow;
