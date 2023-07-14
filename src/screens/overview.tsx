import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";

import { Portal } from "@gorhom/portal";
import { FlashList } from "@shopify/flash-list";
import { useHeaderHeight } from "@react-navigation/elements";

import ImageCard from "../components/ImageCard";
import { CARD_LIST_SIZE } from "../constants/ui";
import { ImageDetailsList } from "../components/ImageDetailList";
import useSWR from "swr";
import { UNSPLASH_API_URL } from "../constants/api";
import { fetcher } from "../utils/api";

type ImageResponse = {
  urls: {
    regular: string;
    small: string;
  };
  id: string;
};

type Image = {
  image: {
    url: string;
    small_url: string;
    id: string;
  };
};

type ResponseProps = {
  results: ImageResponse[];
};

export const sampleData = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1605713288610-00c1c630ca1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNoaWxkcmVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1683998994304-ffe1686f2228?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1683512610949-976be6b66a9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 6,
    image: 'https://plus.unsplash.com/premium_photo-1682432011442-f01023a0924b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1683125695370-1c7fc9ff1315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
  },
] as const


const Home = ({ animatedRef, active, pageX, pageY, headerHeight }) => {
  const _headerHeight = useHeaderHeight();
  const [pageIndex, setPageIndex] = useState(2);
  const [feedData, setFeedData] = useState([]);

  const { data: unsplashData } = useSWR<ResponseProps>(
    `${UNSPLASH_API_URL}&page=${pageIndex}`,
    fetcher
  );
  console.log(unsplashData)

  const parseResponse = (data) => {
    return data?.results.map((item) => {
      return {
        image: {
          url: item.urls.small,
          small_url: item.urls.small,
          id: item.id,
        },
      };
    });
  };

  const addNewBatch = (data) => {
    const _data = feedData.concat(parseResponse(data));
    setFeedData(_data);
  };

  useEffect(() => {
    if (unsplashData?.results) {
      addNewBatch(unsplashData);
    }
  }, [unsplashData]);

  useEffect(() => {
    headerHeight.value = _headerHeight;
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => (
      <ImageCard
        {...{
          index,
          animatedRef,
          active,
          pageX,
          pageY,
          image: item.image,
        }}
      />
    ),
    []
  );
  const handleFetchNextBatch = useCallback(async () => {
    setPageIndex(pageIndex + 1);
  }, [pageIndex]);

  return (
    <View style={{flex: 1}}>
      <FlashList
        numColumns={3}
        data={sampleData}
        renderItem={renderItem}
        keyExtractor={(item) => item.image}
        disableAutoLayout={true}
        estimatedItemSize={CARD_LIST_SIZE}
        onEndReached={handleFetchNextBatch}
        onEndReachedThreshold={0.1}
        ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
      />
      <Portal hostName="DetailsScreen">
        <ImageDetailsList
          active={active}
        />
      </Portal>
    </View>
  );
};

export default Home;
