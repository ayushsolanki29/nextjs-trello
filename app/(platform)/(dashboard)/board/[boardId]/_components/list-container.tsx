"use client";

import { ListWithCards } from "@/types";
import ListForm from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-items";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { list } from "postcss";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}
function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}
const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success(`List Order updated successfully.`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success(`Card Order updated successfully.`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  useEffect(() => {
    setOrderedData(data);
  }, [data]);
  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }
    //dropped in same positon
    if (
      destination.draggableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    //user moves a list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({
          ...item,
          order: index,
        })
      );
      setOrderedData(items);
      executeUpdateListOrder({ items, boardId });
    }
    //user moves a card
    if (type === "card") {
      let newOrderedData = [...orderedData];
      // source and dest list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );
      if (!sourceList || !destList) {
        return;
      }
      // check if cards exists on the source list
      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      // check if cards exists on the dest list
      if (!destList.cards) {
        destList.cards = [];
      }
      // moving the card in same list
      if (source.droppableId === destination.droppableId) {
        const reorderCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderCards.forEach((card, idx) => {
          card.order = idx;
        });
        sourceList.cards = reorderCards;
        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          boardId,
          items: reorderCards,
        });
        // user moves the card to another list
      } else {
        //remove the card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // Assign the new listId to The moved Card
        movedCard.listId = destination.droppableId;
        // add the card to the dest list
        destList.cards.splice(destination.index, 0, movedCard);
        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        //update the orer for each card in destination list
        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });
        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          boardId,
          items: destList.cards,
        })
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1"></div>
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
