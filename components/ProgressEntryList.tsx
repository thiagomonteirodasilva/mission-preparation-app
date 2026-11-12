import React from 'react';
import { Text, View } from 'react-native';
import { ProgressEntry } from '../types';
import { formatISOToBrazilianDate } from '../lib/formatters';

type ProgressEntryListProps = {
  entries: ProgressEntry[];
};

export default function ProgressEntryList({ entries }: ProgressEntryListProps) {
  return (
    <View className="gap-2">
      {entries.length === 0 ? (
        <Text className="text-sm text-slate-500">Nenhum relato registrado.</Text>
      ) : (
        entries.map((entry) => (
          <View key={entry.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <Text className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {formatISOToBrazilianDate(entry.date)}
            </Text>
            <Text className="mt-1 text-base text-slate-800">{entry.text}</Text>
          </View>
        ))
      )}
    </View>
  );
}
