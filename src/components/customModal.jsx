import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Form, FormikProvider } from 'formik';
import React from 'react';

const CustomModal = ({
  onClose,
  onReset,
  isOpen,
  title,
  formikProviderValue,
  handleSubmit,
  children,
}) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <FormikProvider value={formikProviderValue}>
          <Form onSubmit={handleSubmit}>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type='submit'>
                Submit
              </Button>
              <Button variant="ghost" onClick={onReset} type='reset'>
                Reset
              </Button>
            </ModalFooter>
          </Form>
        </FormikProvider>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
