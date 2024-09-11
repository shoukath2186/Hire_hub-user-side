import { Chat } from "../../datatypes.ts/IChatType";


export const displayChatsLogic = (chats: Chat[], userId: string): Chat[] => {

  const result = chats.map((chat) => {

    const opponent = chat.users.filter((user) => user._id !== userId);

    return {
      ...chat,
      users: opponent.length === 1 ? opponent : [],
    };
  });

  return result;
};


export const MessageHedderLogic =(chat: Chat,userId:string):Chat => {

  const opponent = chat.users.filter((user) => user._id !== userId);

  return {
    ...chat,
    users: opponent.length === 1 ? opponent : [],
  };

}
