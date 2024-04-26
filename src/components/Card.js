import React from 'react';
import { Card, CardBody, CardFooter, Image, Stack, Text, Heading, Button } from '@chakra-ui/react';

function NewCardComponent({key,_id,name, title, tag, description, date, image, deletefunction ,deletepost}) {
  const handleDelete = () => {
    deletefunction(key);
  };

  let objcat={fontWeight:'bold',fontFamily: "sans-serif",color:'rgb(4, 96, 103)'};
 
  return (
    <Card direction={{ base: 'column', sm: 'row' }} overflow='auto' variant='outline' style={{boxShadow:'2px 2px 2px grey'}}>
      <Image
        objectFit='contain'
        maxW={{ base: '100%', sm: '200px' }}
        src={image} 
        alt={title}
        style={{boxShadow:'1px 1px 2px darkgreen'}}
      />
      <Stack>
        <CardBody>
          <Heading size='md' style={objcat}>{title}</Heading>
          <div className='card-date-tag' style={{display:'flex'}}>
            <Text py='1'style={{fontFamily:"serif" ,fontWeight:'600',color:"green"}} >12-04-2024</Text>
            <Text py='1'style={{fontFamily:"serif" ,fontWeight:'600',color:"red",marginLeft:'5%'}}>#{tag}</Text>
          </div>
          <Text py='2' style={{overflow:"hidden",fontWeight:'500',fontFamily: "sans-serif",color:'rgb(4, 96, 103)',backgroundColor:'rgb(235, 244, 245)'}}>{description}</Text>
        </CardBody>
        <CardFooter>
          <Button variant='solid'>{name}</Button>
          {deletepost?" ":<Button variant='solid' colorScheme='red' style={{ marginLeft: '2rem' }} onClick={handleDelete}>
            Delete post
          </Button>}
        </CardFooter>
      </Stack> 
    </Card>
  ); 
}

export default NewCardComponent;
