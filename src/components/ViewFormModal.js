import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure } from '@chakra-ui/react';
import QuestionModal from './QuestionModal';
import QuestionItem from './QuestionItem';

const ViewFormModal = ({ isOpen, onClose, formName, questions }) => {
  const [formData, setFormData] = useState([]);
  const { isOpen: isQOpen, onOpen: onQOpen, onClose: onQClose } = useDisclosure();

  // Clear form on close
  useEffect(() => {
    setFormData([]);
  }, [isOpen]);

  // Handle add question
  const handleSubmit = (event) => {
    event.preventDefault();

    // Build string to print
    let tempStringArray = [];
    for (const formInput of event.target) {
      if (formInput.name && formInput.value) tempStringArray.push(`${formInput.name}: ${formInput.type === 'checkbox' ? formInput.checked : formInput.value}`);
    }

    setFormData(tempStringArray);
  }

  return (
    <>
      <QuestionModal isOpen={isQOpen} onClose={onQClose} formName={formName} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{formName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent="flex-end">
              <Button float="right" colorScheme="teal" onClick={onQOpen}>Add Question</Button>
            </Flex>
            <form id="form_preview" onSubmit={handleSubmit}>
              {questions.map(({name, type, choices = []}, index) => 
                <QuestionItem key={index} name={name} type={type} formName={formName} position={index} choices={choices} />
              )}
            </form>
            {formData.length > 0 &&
              <Box mt={10}>
                <Text fontWeight="bold">Form data</Text>
                {formData.map((form) => (
                  <Text>{form}</Text>
                ))}
              </Box>
            }
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" type="submit" form="form_preview">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ViewFormModal;
