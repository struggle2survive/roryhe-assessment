import React, { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { RootState } from "@redux/store";

import useIntersection from "@utils/hooks/useIntersection";
import { getNext } from "@redux/reducer/contentSlice";
import ItemCard from "@components/ItemCard";
import { ContentItem } from "@utils/types";
import './style.scss'


const InfiniteList = () => {
  const displayList = useAppSelector((state: RootState) => state.content.displayList)
  const totalCount = useAppSelector((state: RootState) => state.content.totalCount)

  const dispatch = useAppDispatch()
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasMoreRef = useRef<boolean>(displayList.length < totalCount)

  useEffect(() => {
    hasMoreRef.current = displayList.length < totalCount
  }, [displayList])

  useIntersection((isIntersect) => {
    if (isIntersect && hasMoreRef.current) {
      dispatch(getNext())
    }
  }, scrollRef)

  return (
      <div className="list-container">
          {
              displayList.map((item: ContentItem) => <ItemCard item={item} key={item.id}/>)
          }
          <div ref={scrollRef}>loading...</div>
      </div>
  )
}

export default InfiniteList;
