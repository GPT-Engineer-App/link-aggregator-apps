import React, { useState } from "react";
import { Box, Heading, Text, Link, VStack, HStack, IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaArrowUp, FaMoon, FaSun } from "react-icons/fa";

const LinkItem = ({ link, title, summary, upvotes, onUpvote, userHasUpvoted }) => {
  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md" bg={useColorModeValue("white", "gray.700")}>
      <Heading as="h3" size="md" mb={2}>
        <Link href={link} isExternal>
          {title}
        </Link>
      </Heading>
      <Text mb={2}>{summary}</Text>
      <HStack>
        <IconButton icon={<FaArrowUp />} aria-label="Upvote" onClick={onUpvote} colorScheme={userHasUpvoted ? "green" : "gray"} />
        <Text>{upvotes} upvotes</Text>
      </HStack>
    </Box>
  );
};

const Index = () => {
  const [links, setLinks] = useState([
    {
      id: 1,
      link: "https://example.com",
      title: "Example Link",
      summary: "This is an example link.",
      upvotes: 10,
    },
    {
      id: 2,
      link: "https://another-example.com",
      title: "Another Example",
      summary: "This is another example link.",
      upvotes: 5,
    },
  ]);

  const [userUpvotes, setUserUpvotes] = useState([]);

  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const iconColor = useColorModeValue(<FaMoon />, <FaSun />);

  const handleUpvote = (id) => {
    if (!userUpvotes.includes(id)) {
      setLinks((prevLinks) => prevLinks.map((link) => (link.id === id ? { ...link, upvotes: link.upvotes + 1 } : link)));
      setUserUpvotes((prevUpvotes) => [...prevUpvotes, id]);
    }
  };

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <VStack spacing={4} align="stretch" maxW="container.md" mx="auto">
        <HStack justify="space-between">
          <Heading as="h1" size="xl">
            Link Aggregator
          </Heading>
          <IconButton icon={iconColor} aria-label="Toggle color mode" onClick={toggleColorMode} />
        </HStack>
        {links.map((link) => (
          <LinkItem key={link.id} link={link.link} title={link.title} summary={link.summary} upvotes={link.upvotes} onUpvote={() => handleUpvote(link.id)} userHasUpvoted={userUpvotes.includes(link.id)} />
        ))}
      </VStack>
    </Box>
  );
};

export default Index;
