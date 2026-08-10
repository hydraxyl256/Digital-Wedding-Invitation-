// Wedding Program PDF — editorial keepsake, A4 portrait.
//
// Architecture
// ------------
// • Cover page: deep lake-blue ground with the existing venue.webp as a soft
//   watermark. Editorial typography in Great Vibes / Playfair Display.
// • Program pages: warm ivory with the 10 canonical items. Time → title →
//   gold hairline → description, with a small numbered marker per item.
// • Footer (program pages only): "Palazzo Gallio · Lake Como · October"
//   on the left, page number on the right.
//
// This component is rendered via `pdf(<WeddingProgramDocument />).toBlob()`
// from the `ScheduleDownload` client component. It is never mounted into the
// DOM directly — @react-pdf/renderer walks the React tree on its own.

import * as React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

import { weddingSchedule, type WeddingScheduleItem } from "@/lib/data/weddingSchedule";
import { weddingConfig } from "@/lib/wedding-config";
import { getProgramFonts } from "@/lib/pdf/pdfFonts";

// ─── Palette ─────────────────────────────────────────────────────────────
const COLOR = {
  lakeBlue:     "#1F3A4D",
  warmIvory:    "#F6F1E6",
  mutedSage:    "#8FA396",
  autumnGold:   "#C9A24A",
  terracotta:   "#B5593F",
  charcoal:     "#2C2A26",
  charcoalSoft: "#5A554C",
  dividerIvory: "#E7DFCC",
} as const;

// ─── Layout ──────────────────────────────────────────────────────────────
const PAGE = { size: "A4", orientation: "portrait" } as const;
const MARGIN = { top: 64, right: 64, bottom: 72, left: 64 };

// ─── Deterministic page split ────────────────────────────────────────────
// Item indices chosen so neither page looks sparse. With Cormorant 11pt body
// and ~467pt content width, each item occupies ~80–110pt. The first 5 fit
// comfortably on program page 1, items 6–10 on program page 2.
const FIRST_HALF  = weddingSchedule.slice(0, 5);
const SECOND_HALF = weddingSchedule.slice(5);

const NUMBER_WORDS = [
  "One", "Two", "Three", "Four", "Five",
  "Six", "Seven", "Eight", "Nine", "Ten",
];

// ─── Styles (built lazily so registered fonts are picked up) ────────────
function buildStyles(F: ReturnType<typeof getProgramFonts>) {
  return StyleSheet.create({
    cover: {
      backgroundColor: COLOR.lakeBlue,
      padding: MARGIN.top,
      color: COLOR.warmIvory,
      fontFamily: F.coverSubtitle,
      position: "relative",
    },
    coverWatermark: {
      position: "absolute",
      left: 0, right: 0,
      top: "32%",
      width: "78%",
      alignSelf: "center",
      opacity: 0.22,
    },
    coverEyebrow: {
      fontFamily: F.eyebrow,
      fontWeight: "bold",
      fontSize: 9,
      letterSpacing: 4,
      color: COLOR.autumnGold,
      textAlign: "center",
      marginTop: 96,
    },
    coverTitle: {
      fontFamily: F.coverTitle,
      fontSize: 64,
      color: COLOR.warmIvory,
      textAlign: "center",
      marginTop: 28,
      lineHeight: 1.05,
    },
    coverSubtitle: {
      fontFamily: F.coverSubtitle,
      fontStyle: "italic",
      fontSize: 22,
      color: COLOR.warmIvory,
      opacity: 0.92,
      textAlign: "center",
      marginTop: 18,
    },
    coverRule: {
      width: 96,
      alignSelf: "center",
      borderTopWidth: 0.75,
      borderTopColor: COLOR.autumnGold,
      marginTop: 36,
    },
    coverCouple: {
      fontFamily: F.coverSubtitle,
      fontSize: 14,
      color: COLOR.warmIvory,
      opacity: 0.78,
      letterSpacing: 6,
      textTransform: "uppercase",
      textAlign: "center",
      marginTop: 18,
    },
    coverDate: {
      fontFamily: F.eyebrow,
      fontWeight: "bold",
      fontSize: 9,
      letterSpacing: 4,
      color: COLOR.warmIvory,
      opacity: 0.7,
      textAlign: "center",
      marginTop: 8,
    },
    coverFooter: {
      position: "absolute",
      bottom: 36,
      left: 0, right: 0,
      fontFamily: F.footer,
      fontSize: 8,
      letterSpacing: 3,
      textAlign: "center",
      color: COLOR.warmIvory,
      opacity: 0.55,
    },

    // ─── Program pages ───
    programPage: {
      backgroundColor: COLOR.warmIvory,
      paddingTop: MARGIN.top,
      paddingBottom: MARGIN.bottom,
      paddingLeft: MARGIN.left,
      paddingRight: MARGIN.right,
      color: COLOR.charcoal,
      fontFamily: F.programBody,
    },
    pageHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 28,
    },
    pageHeaderEyebrow: {
      fontFamily: F.eyebrow,
      fontWeight: "bold",
      fontSize: 8,
      letterSpacing: 4,
      color: COLOR.charcoalSoft,
      textTransform: "uppercase",
    },
    pageHeaderRule: {
      flex: 1,
      borderTopWidth: 0.5,
      borderTopColor: COLOR.autumnGold,
      marginLeft: 12,
    },

    itemBlock: {
      marginBottom: 22,
    },
    itemHead: {
      flexDirection: "row",
      alignItems: "baseline",
      marginBottom: 6,
    },
    itemMarker: {
      fontFamily: F.eyebrow,
      fontWeight: "bold",
      fontSize: 8,
      letterSpacing: 3,
      color: COLOR.mutedSage,
      width: 56,
    },
    itemTime: {
      fontFamily: F.programTime,
      fontWeight: "bold",
      fontSize: 10,
      letterSpacing: 4,
      color: COLOR.terracotta,
      textTransform: "uppercase",
      width: 76,
    },
    itemTitleWrap: {
      flex: 1,
    },
    itemTitle: {
      fontFamily: F.programTitle,
      fontSize: 16,
      color: COLOR.charcoal,
    },
    itemDivider: {
      borderTopWidth: 0.5,
      borderTopColor: COLOR.autumnGold,
      marginTop: 6,
      marginBottom: 8,
      marginLeft: 132,
    },
    itemBody: {
      fontFamily: F.programBody,
      fontSize: 11,
      color: COLOR.charcoal,
      lineHeight: 1.55,
      marginLeft: 132,
    },

    // ─── Page footer ───
    pageFooter: {
      position: "absolute",
      bottom: 32,
      left: MARGIN.left,
      right: MARGIN.right,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: F.footer,
      fontSize: 8,
      letterSpacing: 3,
      color: COLOR.charcoalSoft,
      textTransform: "uppercase",
    },
    pageFooterRule: {
      position: "absolute",
      bottom: 52,
      left: MARGIN.left,
      right: MARGIN.right,
      borderTopWidth: 0.5,
      borderTopColor: COLOR.dividerIvory,
    },
  });
}

// ─── Subcomponents ───────────────────────────────────────────────────────
function CoverPage({ styles }: { styles: ReturnType<typeof buildStyles> }) {
  return (
    <Page {...PAGE} style={styles.cover}>
      {/* Soft venue watermark */}
      <Image
        src="/venue.webp"
        style={styles.coverWatermark}
        cache={false}
      />

      <Text style={styles.coverEyebrow}>OCTOBER · LAKE COMO</Text>
      <Text style={styles.coverTitle}>A Timeless Wedding Day</Text>
      <Text style={styles.coverSubtitle}>at Palazzo Gallio, Lake Como</Text>

      <View style={styles.coverRule} />
      <Text style={styles.coverCouple}>{weddingConfig.coupleNames}</Text>
      <Text style={styles.coverDate}>
        {weddingConfig.weddingDateShort.toUpperCase()}
      </Text>

      <Text style={styles.coverFooter}>
        Wedding Program · A Keepsake for Our Beloved Guests
      </Text>
    </Page>
  );
}

function ItemBlock({
  item,
  index,
  styles,
}: {
  item: WeddingScheduleItem;
  index: number;
  styles: ReturnType<typeof buildStyles>;
}) {
  return (
    <View style={styles.itemBlock} wrap={false}>
      <View style={styles.itemHead}>
        <Text style={styles.itemMarker}>{NUMBER_WORDS[index]?.toUpperCase()}</Text>
        <Text style={styles.itemTime}>{item.time}</Text>
        <View style={styles.itemTitleWrap}>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      </View>
      <View style={styles.itemDivider} />
      <Text style={styles.itemBody}>{item.description}</Text>
    </View>
  );
}

function ProgramPage({
  items,
  startIndex,
  eyebrow,
  styles,
}: {
  items: WeddingScheduleItem[];
  startIndex: number;
  eyebrow: string;
  styles: ReturnType<typeof buildStyles>;
}) {
  return (
    <Page {...PAGE} style={styles.programPage}>
      <View style={styles.pageHeader} fixed>
        <Text style={styles.pageHeaderEyebrow}>{eyebrow}</Text>
        <View style={styles.pageHeaderRule} />
      </View>

      {items.map((item, i) => (
        <ItemBlock
          key={`${startIndex + i}-${item.title}`}
          item={item}
          index={startIndex + i}
          styles={styles}
        />
      ))}

      <View style={styles.pageFooterRule} fixed />
      <View style={styles.pageFooter} fixed>
        <Text>Palazzo Gallio · Lake Como · October</Text>
        <Text
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        />
      </View>
    </Page>
  );
}

// ─── Public document ─────────────────────────────────────────────────────
export function WeddingProgramDocument() {
  const fonts = getProgramFonts();
  const styles = buildStyles(fonts);

  return (
    <Document
      title="A Timeless Wedding Day at Palazzo Gallio, Lake Como"
      author={weddingConfig.coupleNames}
      subject="Wedding Program"
    >
      <CoverPage styles={styles} />
      <ProgramPage
        items={FIRST_HALF}
        startIndex={0}
        eyebrow="THE PROGRAMME"
        styles={styles}
      />
      <ProgramPage
        items={SECOND_HALF}
        startIndex={5}
        eyebrow="THE PROGRAMME · CONTINUED"
        styles={styles}
      />
    </Document>
  );
}

export default WeddingProgramDocument;
