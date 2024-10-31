import React, { useEffect, useState } from 'react';
import { Page, Text, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { ReportStorage } from '../services/LocalStorage';

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 16,
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

// Function to map markdown to styled components
const formatReportContent = (reportContent) => {
  const lines = reportContent.split('\n');
  return lines.map((line, index) => {
    // Handle headers
    if (line.startsWith('### ')) {
      return <Text key={index} style={styles.header}>{line.replace('### ', '')}</Text>; // H3
    }
    if (line.startsWith('#### ')) {
      return <Text key={index} style={styles.subHeader}>{line.replace('#### ', '')}</Text>; // H4
    }
    // Handle bullet points
    if (line.startsWith('- ')) {
      return (
        <Text key={index} style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text> {/* Custom bullet */}
          <Text style={styles.bulletText}>{line.replace('- ', '').trim()}</Text>
        </Text>
      );
    }
    // Handle numbered list
    if (line.match(/^\d+\./)) {
      return (
        <Text key={index} style={styles.bulletPoint}>
          <Text style={styles.bullet}>{line.match(/^\d+\./)[0]}</Text>
          <Text style={styles.bulletText}>{line.replace(/^\d+\./, '').trim()}</Text>
        </Text>
      );
    }
    // Regular text
    return <Text key={index} style={styles.text}>{line}</Text>;
  });
};

export default function Report() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const report = await ReportStorage.getReport();
        setMessage(report);
      } catch (error) {
        console.error('Error fetching report:', error);
        setMessage('Error loading report.');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!message) {
    return <Text>Error loading report.</Text>;
  }

  return (
    <Document>
      <Page style={styles.page}>
        <Image
          src="/images/lifequest.png" // Ensure the image path is correct
          style={{ width: 50, height: 50, marginBottom: 10 }}
        />
        {formatReportContent(message)}
      </Page>
    </Document>
  );
}
