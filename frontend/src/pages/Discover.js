import React from "react";
import { useTranslation } from "react-i18next";
import '../styles/Discover.css';

import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar
} from "react-native";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

function srcset(image, width, height, rows = 1, cols = 1) {
	return {
	  src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
	  srcSet: `${image}?w=${width * cols}&h=${
		height * rows
	  }&fit=crop&auto=format&dpr=2 2x`,
	};
  }

  const Discover = () => {
	const { t } = useTranslation();
	const tips = t('tips', { returnObjects: true })

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t("discover")}</Text>
	  <Text style={styles.text}>{t('discoverInfo')}</Text>
	  <ImageList
      sx={{
        maxWidth: 500,
        height: '100vh',
		marginBottom: 8,
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: 'translateZ(0)',
      }}
      rowHeight={200}
      gap={1}
    >
      {tips.map((item) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;

        return (
          <ImageListItem key={item.img} cols={cols} rows={rows}>
            <img
              {...srcset(item.img, 250, 200, rows, cols)}
              alt={item.image_alt}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background: '#000',
				color: "#fff",
				height: "auto",
				flexWrap: "wrap"
              }}
			  subtitle={<span>{t(item.tips)}</span>}
			  
            />
          </ImageListItem>
        );
      })}
    </ImageList>
    </SafeAreaView>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: StatusBar.currentHeight,
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginTop: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#000",
    marginBottom: 20,
    textAlign: "left",
	paddingBottom: "1rem",
	borderBottomColor: '#B3B3B3',
	borderBottomWidth: "1px",
	maxWidth: "500px"
  }
});
