import React from 'react';
import { Pressable, Text } from 'react-native';
import { Young } from '../types';

type YoungListItemProps = {
  young: Young;
  onPress?: (youngId: string) => void;
};

export default function YoungListItem({ young, onPress }: YoungListItemProps) {
  return (
    <Pressable onPress={() => onPress?.(young.id)} className="rounded-lg border border-slate-200 bg-slate-50 p-2">
      <Text className="text-base text-slate-800">
        {young.name} ({young.age} anos)
      </Text>
    </Pressable>
  );
}
