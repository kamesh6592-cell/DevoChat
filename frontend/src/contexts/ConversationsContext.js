// src/contexts/ConversationsContext.js
import React, { createContext, useState, useCallback } from "react";
 
export const ConversationsContext = createContext();

export function ConversationsProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [error, setError] = useState(null);

  const fetchConversations = useCallback(async () => {
    setIsLoadingChat(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_FASTAPI_URL}/conversations`, {
        credentials: "include"
      });
      if (!res.ok) {
        throw new Error('Failed to load conversations.');
      }
      const data = await res.json();
      setConversations(data.conversations);
      setError(null);
    } catch (error) {
      setError(error.message || "Failed to load conversations.");
    } finally {
      setIsLoadingChat(false);
    }
  }, []);

  const addConversation = (newConversation) => {
    setConversations((prevConversations) => [
      ...prevConversations,
      newConversation,
    ]);
  };

  const deleteConversation = (conversation_id) => {
    setConversations((prevConversations) =>
      prevConversations.filter(
        (conv) => conv.conversation_id !== conversation_id
      )
    );
  };

  const deleteAllConversation = () => {
    setConversations([]);
  };

  const updateConversation = (conversation_id, newAlias, isLoading = undefined) => {
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.conversation_id === conversation_id
          ? { 
              ...conv, 
              alias: newAlias,
              ...(isLoading !== undefined && { isLoading })
            }
          : conv
      )
    );
  };

  const toggleStarConversation = (conversation_id, starred) => {
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.conversation_id === conversation_id 
          ? { ...conv, starred, starred_at: starred ? new Date().toISOString() : null }
          : conv
      )
    );
  };

  return (
    <ConversationsContext.Provider value={{
      conversations,
      isLoadingChat,
      error,
      fetchConversations,
      addConversation,
      deleteConversation,
      deleteAllConversation,
      updateConversation,
      toggleStarConversation
    }}>
      {children}
    </ConversationsContext.Provider>
  );
}