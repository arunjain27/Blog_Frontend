import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';

function NewCardComponent({
  _id,
  name = "none",
  title = "please upload the title",
  tag = "please upload the tag",
  description = "please upload the description",
  date = "12-23-2024",
  image = "ddvvdvd",
  deletefunction,
  deletepost,
  editpost
}) {
  const handleDelete = () => {
    deletefunction(_id);
  };
  const indianDateTimeString = new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  return (
    <Card direction={{ base: "column", sm: "row" }} overflowY="auto" variant="outline" style={{ boxShadow: "2px 2px 2px grey", scrollBehavior: "initial", marginTop: "10px" }}>
      <Image objectFit="contain" maxW={{ base: "100%", sm: "200px" }} src={image} alt={title} style={{ boxShadow: "1px 1px 2px darkgreen" }} />
      <Stack>
        <CardBody>
          <Heading size="md" fontWeight="bold" fontFamily="sans-serif" color="rgb(4, 96, 103)">{title}</Heading>
          <div className="card-date-tag" style={{ display: "flex", flexWrap: "column" }}>
            <Text py="1" fontFamily="serif" fontSize="0.7rem" fontWeight="600" color="rgb(112, 131, 134)"> {indianDateTimeString}</Text>
            <Text py="0" ml="5" fontFamily="serif" fontWeight="600" color="red"> #{tag}</Text>
          </div>
          <Text py="2" style={{ overflow: "hidden", fontWeight: "500", fontFamily: "sans-serif", color: "rgb(4, 96, 103)", backgroundColor: "rgb(235, 244, 245)" }}>{description}</Text>
        </CardBody>
        <CardFooter>
          <Button variant="solid">
            <span style={{ fontWeight: "600", fontSize: "0.8rem", color: "grey" }}>Posted by: </span> {name}
          </Button>
          {deletepost ? null : (
            <Button variant="solid" colorScheme="red" style={{ marginLeft: "2rem" }} onClick={handleDelete}>Delete post</Button>
          )}
        
        {editpost ? (
  <Link 
    to={`/edit-blog/${_id}`} 
    className="edit-link" 
    style={{
      display: 'inline-block',
       marginLeft:'10px',
       padding: '8px 25px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: '#007bff', // Blue background color
      borderRadius: '5px',
      textAlign: 'center',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = '#0056b3'; // Darker blue on hover
      e.target.style.transform = 'scale(1.05)'; // Slightly enlarge the button on hover
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = '#007bff'; // Original blue color
      e.target.style.transform = 'scale(1)'; // Return to original size
    }}
  >
    Edit Post
  </Link>
) : ""}

        </CardFooter>
      </Stack>
    </Card>
  );
}

export default NewCardComponent;
