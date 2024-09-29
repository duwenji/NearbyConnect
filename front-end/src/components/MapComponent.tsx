import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
//import VideoOverlay from './VideoOverlay';
import VideoOverlay from './VideoOverlay';

import 'leaflet/dist/leaflet.css';

// Map: 地図を表示するコンポーネント
// center: [number, number]: 地図の中心座標
// zoom: number: 地図のズームレベル
// MapContainer Style: 地図のスタイル
//  height: string: 地図の高さ
//  width: string: 地図の幅
// interactiveOptions:  
//    zoomControl: boolean: ズームコントロールの表示フラグ
//    zoomSnap: number: ズームスナップ
//    zoomDelta: number: ズームデルタ
//    doubleClickZoom: boolean: ダブルクリックズームの表示フラグ
//    boxZoom: boolean: ボックスズームの表示フラグ
//    touchZoom: boolean: タッチズームの表示フラグ
//    scrollWheelZoom: boolean: スクロールホイールズームの表示フラグ
//    closePopupOnClick: boolean: ポップアップクリックの表示フラグ
//    dragging: boolean: ドラッグの表示フラグ
//    trackResize: boolean: リサイズのトラッキングフラグ
//    tap: boolean: タップの表示フラグ
// printable: boolean: プリントの表示フラグ
// downloadable: boolean: ダウンロードの表示フラグ

// TileLayer: 地図のタイルを表示するコンポーネント
// osm: OpenStreetMapのタイルを表示するコンポーネント
//   url: string: タイルのURL
//   attribution: string: タイルの著作権表示
// Marker: マーカーを表示するコンポーネント
//   key: string: マーカーのキー
//   position: [number, number]: マーカーの座標
//   markicon: マーカーアイコンを表示するコンポーネント
//     iconUrl: string: アイコンのURL
//     iconSize: [number, number]: アイコンのサイズ
//     iconAnchor: [number, number]: アイコンのアンカー
//     popupAnchor: [number, number]: ポップアップのアンカー
//   Popup: ポップアップを表示するコンポーネント
//     html: string: ポップアップのHTML 

// ImageOverlay: 画像オーバーレイを表示するコンポーネント
//   url: string: 画像のURL
//   bounds: [[number, number], [number, number]]: 画像の境界
//   opacity: number: 画像の透明度
//   interactive: boolean: インタラクティブのフラグ
// VideoOverlay: ビデオオーバーレイを表示するコンポーネント
//   url: string: ビデオのURL
//   bounds: [[number, number], [number, number]]: ビデオの境界
//   autoplay: boolean: 自動再生のフラグ
//   loop: boolean: ループのフラグ
//   keepAspectRatio: boolean: アスペクト比を保持するフラグ
//   muted: boolean: ミュートのフラグ
//   playsinline: boolean: インライン再生のフラグ

// user: User: ユーザー情報
//   email: string: ユーザーのメールアドレス
//   name: string: ユーザー名
//   type: ContentType: ユーザーのコンテンツタイプ
//   url: string: ユーザーのURL
//   showLocation(): void: ユーザーの位置情報を表示する関数
//      isanimate: boolean: アニメーションのフラグ
//   marker: Marker: ユーザーのマーカー
//      geo-location-flag: boolean: ユーザーの位置情報のフラグ
//      current-location: Location: ユーザーの現在位置情報
//        latitude: number: 緯度
//        longitude: number: 経度


interface MapComponentProps {
  latitude: number;
  longitude: number;
  zoom: number;
  info: string;
}

const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude, zoom, info }) => {
  const center: [number, number] = [latitude, longitude];

  const videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4'; // ここにビデオのURLを設定します
  const bounds: [[number, number], [number, number]] = [
    [latitude - 0.02, longitude - 0.02],
    [latitude + 0.02, longitude + 0.02]
  ];

  return (
    <MapContainer style={{ height: "90vh", width: "100vw" }}>
      <ChangeView center={center} zoom={13} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
      />
      <VideoOverlay url={videoUrl} bounds={bounds} play={false} muted={true} interactive={true}/>
    </MapContainer>
  );
};

export default MapComponent;
