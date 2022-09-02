import React, { useContext } from 'react';
import { store } from '../store/Store';
import { Flex, Heading, Button, TableContainer, Table, Thead, Th, Tbody, Tr, useDisclosure } from '@chakra-ui/react';
import FormModal from '../components/FormModal';
import FormRow from '../components/FormRow';

const Home = () => {
  const { state } = useContext(store);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex>
        <Heading flex="1" as="h3" size="lg">Form Builder</Heading>
        <Button colorScheme="teal" onClick={onOpen}>Add Form</Button>
        
      </Flex>

      <FormModal isOpen={isOpen} onClose={onClose} />

      <TableContainer marginTop="32px">
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Form Name</Th>
              <Th>Number of Questions</Th>
              <Th isNumeric></Th>
            </Tr>
          </Thead>
          <Tbody>
            {state.forms?.map(({name, questions}, index) =>
              <FormRow key={index} name={name} questions={questions} position={index} />
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Home;
