import React, { useContext, useState } from 'react';
import { Flex, Text, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Select } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { store } from '../store/Store';

const QuestionModal = ({ isOpen, onClose, formName }) => {
  const { dispatch } = useContext(store);
  const [isMC, setIsMC] = useState(false);
  const [choices, setChoices] = useState([]);

  // Handle add question
  const handleAdd = (event) => {
    event.preventDefault();
    const [ name, type ] = event.target;

    // Get multiple choices
    let mcArray = [];
    for (const input of event.target) {
      if (input.name?.includes('choice-')) mcArray.push(input.value);
    }

    dispatch({ type: 'addQuestion', payload: { name: name.value, type: type.value, formName, choices: mcArray } });
    onClose();
  }

  // Handle type change
  const handleOnChange = (event) => {
    const value = event.target.value;

    // Update UI if it's Multiple Choice
    setIsMC(value === 'Multiple Choice');
    setChoices(prev => [...prev, {type: 'text'}]);
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
              <Input type="text" name="question" placeholder="e.g. What is your favorite color?" mb={3} />
              <Select name="type" onChange={handleOnChange}>
                <option value="Text">Text</option>
                <option value="Boolean">Boolean</option>
                <option value="Number">Number</option>
                <option value="Multiple Choice">Multiple Choice</option>
              </Select>

              {isMC &&
                <>
                  <Text fontWeight="bold" mt={6}>Choices:</Text>
                  {choices.map((choice, index) =>
                    <Flex key={index} mt={3}>
                      <Input flex="1" type={choice.type} name={`choice-${index}`} />
                      {index === choices.length - 1 && <IconButton ml={3} icon={<AddIcon />} onClick={() => setChoices(prev => [...prev, {type: 'text'}])} />}
                    </Flex>
                  )}
                </>
              }
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

export default QuestionModal;
