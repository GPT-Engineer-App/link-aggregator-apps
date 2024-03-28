import { useState } from "react";
import { VStack, HStack, Text, Button } from "@chakra-ui/react";

const initialStories = [
  { id: 1, title: "Story 1", summary: "Summary of story 1", link: "#", upvotes: 5, topics: ["tech", "innovation"] },
  { id: 2, title: "Story 2", summary: "Summary of story 2", link: "#", upvotes: 3, topics: ["health", "science"] },
];

const TopicFilter = ({ topics, onTopicSelect }) => {
  return (
    <HStack spacing={2} mb={4}>
      {topics.map((topic) => (
        <Button key={topic} onClick={() => onTopicSelect(topic)}>
          {topic}
        </Button>
      ))}
    </HStack>
  );
};

const StoryList = ({ stories }) => {
  const sortedStories = stories.sort((a, b) => b.upvotes - a.upvotes);

  return (
    <VStack align="stretch">
      {sortedStories.map((story) => (
        <HStack key={story.id} p={4} boxShadow="md" borderRadius="lg">
          <VStack align="start">
            <Text fontWeight="bold">{story.title}</Text>
            <Text>{story.summary}</Text>
            <Text>Upvotes: {story.upvotes}</Text>
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
};

const Index = () => {
  const [stories, setStories] = useState(initialStories);
  const topics = Array.from(new Set(stories.flatMap((story) => story.topics)));
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const filteredStories = selectedTopic ? stories.filter((story) => story.topics.includes(selectedTopic)) : stories;

  return (
    <VStack spacing={4}>
      <TopicFilter topics={topics} onTopicSelect={handleTopicSelect} />
      <StoryList stories={filteredStories} />
    </VStack>
  );
};

export default Index;
