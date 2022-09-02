import React, { useContext } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Select } from '@chakra-ui/react';
import { store } from '../store/Store';

const FormModal = ({ isOpen, onClose }) => {
  const { dispatch } = useContext(store);

  // Handle add question
  const handleAdd = (event) => {
    event.preventDefault();
    const [ name ] = event.target;
    dispatch({ type: 'addForm', payload: { name: name.value, questions: [] } });
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="form_add_question" onSubmit={handleAdd}>
              <Input type="text" name="question" placeholder="Form name" mb={3} />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='teal' type="submit" form="form_add_question">Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FormModal;
