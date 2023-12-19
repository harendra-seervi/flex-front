import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form, Modal } from 'react-bootstrap';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    DOB: '',
    address: '',
    start_date: '',
    batch_timing: '6-7AM',
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAgree = async () => {
    try {
      console.log(formData);
      // Make a POST request to save all details
      const response = await fetch('http://localhost:4000/api/v1/userDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const res= await response.json();
      // if (response.ok) {
      //   const result = await response.json();
      //   // Make another POST request for payment using the returned user ID
      //   const paymentResponse = await fetch('http://localhost:4000/api/v1/payment', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ userId: result.userId }),
      //   });

      //   if (paymentResponse.ok) {
      //     console.log('Payment successful!');
      //   } else {
      //     console.error('Payment failed.');
      //   }
      // } else {
      //   console.error('Form submission failed.');
      // }
    } catch (error) {
      console.error('Error during form submission:', error);
    }

    // Close the modal after processing
    setShowModal(false);
  };

  const handleDisagree = () => {
    // Close the modal if the user disagrees
    setShowModal(false);
  };

  const handleNext = (e) => {
    // Prevent the default form submission
    e.preventDefault();
    // Open the modal when the "Next" button is clicked
    setShowModal(true);
  };

  return (
    <div className="pt-3 mb-3 md-4 final">
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h6 className="fw-bold mb-2 text-center text-uppercase">
                    Yoga Classes Registration
                  </h6>
                  <div className="mb-3">
                    <Form onSubmit={handleNext}>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Phone number"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formDOB">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Date of Birth"
                          id="DOB"
                          value={formData.DOB}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Enter your address"
                          id="address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <h6 className="fw-bold mb-2 text-center text-uppercase">
                        Enrollment Details
                      </h6>
                      <Form.Group className="mb-3" controlId="formDOB">
                        <Form.Label>Choose start date</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Date of Birth"
                          id="start_date"
                          value={formData.start_date}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formTimeRange">
                        <Form.Label>Select batch timing</Form.Label>
                        <Form.Control
                          as="select"
                          id="batch_timing"
                          value={formData.batch_timing}
                          onChange={handleChange}
                        >
                          <option value="6-7AM">6-7 AM</option>
                          <option value="7-8AM">7-8 AM</option>
                          <option value="8-9AM">8-9 AM</option>
                          <option value="5-6PM">5-6 PM</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Next
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal for Agree/Disagree */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Proceed with Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you agree to proceed with the payment?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDisagree}>
            Disagree
          </Button>
          <Button variant="primary" onClick={handleAgree}>
            Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
