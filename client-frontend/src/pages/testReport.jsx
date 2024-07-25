import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ReportTest from '../components/reportTest'

export default function testReport() {
    return (
        <div>
            <PDFDownloadLink document={<ReportTest />} filename="FORM">
                download
            </PDFDownloadLink>
            <h1>HI </h1>
        </div>
    )
}
