import React, { useEffect, useState } from 'react';
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';
import { ReportStorage } from '../services/LocalStorage';

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bullet: {
    width: 10,
    fontSize: 12,
  },
  bulletText: {
    fontSize: 12,
  },
});

export default function Report() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const report = await ReportStorage.getReport();
      setMessage(report);
    };

    fetchReport();
  }, []);

  if (!message) {
    return <Text>Loading...</Text>;
  }

  // Remove markdown formatting and structure content
  const formattedMessage = message
    .replace(/### /g, '') // Remove '### ' from headers
    .replace(/\*\*/g, ''); // Remove '**' from bold text

  const lines = formattedMessage.split('\n');

  return (
    <Document>
      <Page style={styles.page}>
        {lines.map((line, index) => {
          if (line.startsWith('Client Information Summary:')) {
            return <Text key={index} style={styles.header}>{line}</Text>;
          }
          if (line.startsWith('Explanation of Insurance Premium Prediction')) {
            return <Text key={index} style={styles.subHeader}>{line}</Text>;
          }
          if (line.startsWith('Recommendations for Additional Prudential Singapore Products')) {
            return <Text key={index} style={styles.subHeader}>{line}</Text>;
          }
          if (line.match(/^\d+\./)) {
            return (
              <Text key={index} style={styles.bulletPoint}>
                <Text style={styles.bullet}>{line.match(/^\d+\./)[0]}</Text>
                <Text style={styles.bulletText}>{line.replace(/^\d+\./, '').trim()}</Text>
              </Text>
            );
          }
          return <Text key={index} style={styles.text}>{line}</Text>;
        })}
      </Page>
    </Document>
  );
}
