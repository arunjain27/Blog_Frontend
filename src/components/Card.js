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
}) {
  const handleDelete = () => {
    deletefunction(_id);
  };

  const utcDateString = date;
  const indianDateTimeString = new Date(utcDateString).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  let objcat = {
    fontWeight: "bold",
    fontFamily: "sans-serif",
    color: "rgb(4, 96, 103)",
  };

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="auto"
      variant="outline"
      style={{
        boxShadow: "2px 2px 2px grey",
        scrollBehavior: "initial",
        marginTop: "10px",
      }}
    >
      <Image
        objectFit="contain"
        maxW={{ base: "100%", sm: "160px" }}
        src={image}
        alt={title}
        style={{ boxShadow: "1px 1px 2px darkgreen" }}
      />
      <Stack>
        <CardBody>
          <Heading size="md" style={objcat}>
            {title}
          </Heading>
          <div
            className="card-date-tag"
            style={{ display: "flex", flexWrap: "column" }}
          >
            <Text
              py="1"
              style={{
                fontFamily: "serif",
                fontSize: "0.7rem",
                fontWeight: "600",
                color: "rgb(112, 131, 134)",
                "@media screen and (max-width: 500px)": {
                  fontSize: "0.4rem",
                },
              }}
            >
              {indianDateTimeString}
            </Text>
            <Text
              py="0"
              ml="5"
              style={{
                fontFamily: "serif",
                fontWeight: "600",
                color: "red",

                "@media screen and (max-width: 500px)": {
                  fontSize: "0.4rem",
                },
              }}
            >
              #{tag}
            </Text>
          </div>
          <Text
            py="2"
            style={{
              overflow: "hidden",
              fontWeight: "500",
              fontFamily: "sans-serif",
              color: "rgb(4, 96, 103)",
              backgroundColor: "rgb(235, 244, 245)",
            }}
          >
            {description}
          </Text>
        </CardBody>
        <CardFooter>
          <Button variant="solid">{name}</Button>
          {deletepost ? (
            " "
          ) : (
            <Button
              variant="solid"
              colorScheme="red"
              style={{ marginLeft: "2rem" }}
              onClick={handleDelete}
            >
              Delete post
            </Button>
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default NewCardComponent;
