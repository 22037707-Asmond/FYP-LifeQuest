import React, { useEffect, useState } from "react";
import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer";


export default function ReportTest() {

    return (
        <Document>
            <Page size="A4">
                <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptas, mollitia explicabo? Magnam nisi cumque veniam sit repellendus
                    ullam temporibus laboriosam architecto, ipsum molestiae totam asperiore
                    s voluptas placeat nobis. Sint, cumque.</Text>
            </Page>
        </Document>
    );
}