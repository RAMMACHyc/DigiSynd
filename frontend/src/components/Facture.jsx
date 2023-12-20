import React from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import { TfiImport } from "react-icons/tfi";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: '1fr ',
    gridGap: 10,
  },
  listItem: {
    marginBottom: 5,
    
  },
  label: {
    fontWeight: 'bold',
  },
  downloadButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },

});

export default function Facture({ apartment }) {
  const invoiceData = {
    Number: apartment.number,
    Etage: apartment.etage,
    Resident: apartment.resident,
    Statut: apartment.paymentStatus,
  };

  return (
    <div>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {Object.entries(invoiceData).map(([key, value], index) => (
            <Text key={index} style={styles.listItem}>
              <Text style={styles.label}>{key}:</Text> {value}
            </Text>
          ))}
        </View>
      </Page>
      <PDFDownloadLink document={<Invoice invoiceData={invoiceData} />} fileName="invoice.pdf">
        {({ blob, url, loading, error }) => (
          <div className='pl-[7.6rem] py-2 bg-gray-700 hover:bg-gray-800 rounded-md shadow-md text-white '>{loading ? 'Generating PDF...' : <TfiImport className='text-center' />}</div>
        )}
      </PDFDownloadLink>
    </div>
  );
}

function Invoice({ invoiceData }) {
  const imageUrl = 'https://img.freepik.com/free-vector/completed-concept-illustration_114360-3449.jpg?w=740&t=st=1703061457~exp=1703062057~hmac=bfcdb1aa740fe21503b1d4c1642ec36f2656c305cf24eac81bdee299bcc087be'; 
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={{backgroundColor: '#858585', width:'100%', height:'40px'}}>
            <Text style={{color:'#ffffff',borderRadius:'12px', textAlign:'center',paddingTop:'9px'}}>Facture</Text>
          </View>
          <View style={{ width:'100%', height:'5px',backgroundColor:'#0000'}}>
         
          </View>
          <View style={{ marginTop:'20px' }}>
          {Object.entries(invoiceData).map(([key, value], index) => (
            <Text key={index} style={styles.listItem}>

              <Text style={styles.label}>{key}:</Text> {value}
              
           
            </Text>
          ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
