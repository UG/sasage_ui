import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Editor from '../editor';
import { CssBaseline, Typography, Container, Grid, Paper, Box, TextField, Button, MenuItem, FormControl, FormControlLabel, Collapse, Checkbox, Select, InputLabel, IconButton, TableBody, Table, TableCell, TableContainer, TableRow, TableHead } from '@material-ui/core/';
import { DropzoneArea } from 'material-ui-dropzone';
import { ArrowBack, Visibility, VisibilityOff, Delete, Backup, Image, Close, MonetizationOn, AccessAlarm } from '@material-ui/icons';
import { useParams, Link } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup, Alert } from '@material-ui/lab';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactImageMagnify from 'react-image-magnify';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import axios from 'axios';

const today = new Date();

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        maxWidth: 600,
        maxHeight: 230,
        margin: 5,
        flexWrap: 'nowrap',
        overflow: 'auto'
    },
    gridImage: {
        width: 130,
        height: 180,
    },
    verticalTiny: {
        height: 20,
    },
    verticalSpace: {
        height: 50,
    },
    red: {
        textAlign: 'left',
        backgroundColor: 'red',
    },
    blue: {
        textAlign: 'left',
        backgroundColor: 'blue',
    },
    orange: {
        textAlign: 'left',
        backgroundColor: 'orange',
    },
    purple: {
        textAlign: 'left',
        backgroundColor: 'purple',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 500,
    },
    border: {
        border: '1px solid #666',
        padding: 15
    },
    mainImage: {
        textAlign: 'center',
        width: 300,
        height: 400
    },
    datePicker: {
        width: 170,
        wordWrap: 'nowrap',
    },
    overlay: {
        textAlign: 'center',
        position: 'relative',
        bottom: 35,
        height: 35,
        background: 'rgba(0, 0, 0, 0.4)',
        color: '#f1f1f1',
        width: '100%',
        opacity: 1,
        fontSize: 12,
    },
    textField: {
        padding: 3,
        margin: 3,
    },
    right: {
        textAlign: 'right'
    },
    center: {
        alignSelf: 'center',
    },
    stockTextWidth: {
        width: 60
    },
    sizeTable: {
        '& > table': {
            width: '100%',
            display: 'table',
            '& > tbody > tr > td': {
                borderBottom: '1px solid #d7d7d7',
                textAlign: 'center',
            }
        }
    }
}));
const brand = ["XLARGE", "XLARGE USA", "MILKFED", "X-GIRL", "MILKFED(KIDS)", "MTG", "HUNTISM", "SILAS", "SILAS WOMEN", "SILAS OTHER", "MARIA OTHER", "X-GIRL STAGES FIRST STAGE", "X-GIRL STAGES NEXT STAGE", "XL-KIDS", "STITCH", "ADIDAS", "XG", "SARCASTIC", "AMONGST FRIENDS", "2K BY GINGHAM", "SNEAKER LAB", "NIKE", "NEW BALANCE", "REEBOK", "MILK CRATE", "ANYTHING", "VANS", "PUMA", "US VERSUS THEM", "ODD FUTURE", "DJ SHADOW", "COCOLO BLAND", "LADYS SHOES", "LAKAI MAIN", "LAKAI ANCHOR", "LAKAI ECHELON", "LAKAI STANDARD", "THE HILL SIDE ", "WHITE RAVEN", "Community Mill 雑貨", "Community Mill アパレル", "CONVERSE", "ASICS TIGER", "STANCE", "CHAMPION", "CANDIES", "MISFISH T", "NITTA KEIICHI", "GIZMOBIES", "OGURA", "FLATLUX", "TERUYA", "X-CLOSET ADIDAS ORIGINALS", "X-CLOSET", "店舗 OTHER", "CALIF OTHER", "営サ OTHER", "STYLES OTHER", "MONTAGE OTHER", "STITCH OTHER", "XG OTHER", "X-GIRL STAGES OTHER", "X-GIRL OTHER", "MILKFED OTHER", "XLARGE OTHER"];
const genre = ["アウター", "ベスト", "ブルゾン", "ポンチョ", "ガウン", "マウンテンパーカー", "スタジャン", "デニムジャケット・Gジャン", "ライダースジャケット", "ニットアウター", "テーラードジャケット", "ノーカラージャケット", "ミリタリージャケット", "レインコート", "Pコート", "スプリングコート", "トレンチコート", "ステンカラーコート", "チェスターコート", "ダッフルコート", "ウールコート", "モッズコート・ミリタリーコート", "ダウンベスト", "ダウンジャケット/コート", "ファーアウター", "ムートンコート", "その他アウター", "トップス", "キャミソール", "チュニック", "ビスチェ", "チューブトップ・ベアトップ", "タンクトップ", "カットソー", "Ｔシャツ", "ポロシャツ", "シャツ", "ブラウス", "ニット", "カーディガン", "ボレロ", "パーカー", "スウェット・トレーナー", "プルオーバー", "アンサンブル", "トップス＋インナーセット", "ジャージ", "その他トップス", "ワンピース", "ベアワンピース", "キャミワンピース", "ノースリーブワンピース", "カットワンピース", "シャツワンピース", "ニットワンピース", "ミニワンピース", "膝丈ワンピース", "マキシ丈・ロングワンピース", "オールインワン", "パーティードレス", "ワンピース・ドレス＋トップスセット", "トップス＆ボトムセット", "その他ワンピース", "スカート", "ミニスカート", "膝丈スカート", "ロングスカート", "タイトスカート", "フレアスカート", "デニムスカート", "ジャンパースカート・サス付スカート", "その他スカート", "パンツ", "デニムショートパンツ", "デニムパンツ・ジーンズ", "ショートパンツ", "キュロット", "クロップドパンツ", "ロングパンツ", "スキニーパンツ", "レギパン", "スカパン", "チノパンツ", "タックパンツ", "カーゴパンツ", "ストレートパンツ", "ワイドパンツ", "ブーツカットパンツ", "サロペット・オーバーオール", "スウェットパンツ", "その他パンツ", "部屋着・ルームウェア", "パジャマ・ルームウェア", "シャツ", "Tシャツ・カットソー", "パーカー", "プルオーバー", "カーディガン", "ショートパンツ", "ロングパンツ", "ワンピース", "オールインワン", "セットアップ", "ガウン", "バスローブ", "小物", "ヘアアクセサリー", "ウエストウォーマー", "アイマスク", "ブランケット", "ネックピロー", "レッグウェア", "その他部屋着・ルームウェア", "スポーツウェア", "インナー", "スポーツブラ", "トップス", "スカート", "パンツ", "ワンピース", "アウター", "シューズ", "レッグウェア", "バッグ/ポーチ", "スポーツグッズ", "サウナスーツ", "その他スポーツウェア", "スーツ", "ジャケット(単品)", "スカート(単品)", "スーツパンツ(単品)", "スーツセット", "その他スーツ", "ブラックフォーマル・礼服・喪服", "ジャケット(単品)", "スーツパンツ(単品)", "スカート(単品)", "ワンピース(単品)", "セット", "その他", "制服・スクールアイテム", "シャツ", "ベスト・カーディガン", "セーター・ジャケット", "スカート", "リボン・ネクタイ・靴下", "スクールバッグ", "その他制服・スクールアイテム", "オフィスカジュアル・事務服", "事務服", "その他", "シューズ(靴)", "スニーカー", "スリッポン", "サンダル", "フラットシューズ", "パンプス", "ブーティ", "ショートブーツ", "ミドルブーツ", "ロングブーツ", "ニーハイ・サイハイブーツ", "ドレスシューズ", "ムートンブーツ", "ビーチサンダル", "レインシューズ", "シューケアグッズ", "その他シューズ(靴)", "バッグ・財布・小物入れ", "ショルダーバッグ", "ハンドバッグ", "トートバッグ", "リュック", "ボストンバッグ", "ボディバッグ・ウエストポーチ", "ポーチ", "クラッチバッグ", "カゴバッグ", "キャンバスバッグ", "キャリーケース", "メッセンジャーバッグ", "パーティーバッグ", "ドラムバッグ", "エコバッグ", "財布", "コインケース・札入れ", "カードケース", "パスケース", "名刺入れ", "その他バッグ・財布・小物入れ", "帽子", "ハット", "ニット帽", "ベレー帽", "キャップ", "ツバ広帽", "キャスケット", "その他帽子", "アクセサリー", "ピアス", "イヤリング", "リング", "ネックレス", "ブレスレット・バングル", "アンクレット", "ヘッドアクセサリー", "ブローチ", "チャーム", "その他アクセサリー", "ファッション雑貨", "ストール・マフラー・スヌード", "スカーフ・バンダナ", "ネックウォーマー", "イヤーマフ", "サングラス", "メガネ", "ブランケット", "ベルト・サスペンダー", "グローブ", "腕時計", "扇子", "傘", "キーケース・キーホルダー", "ハンカチ・ハンドタオル", "その他ファッション雑貨", "インナー・ランジェリー", "ブラジャー", "ショーツ・パンティ", "ブラ＆ショーツセット", "ヌーブラ", "アンダーウェア", "Tバック・ソング", "ブラ＆Tバックセット", "ベビードール", "ガードル", "補正下着・シェイプファンデ", "ブライダルインナー", "サニタリーショーツ", "その他インナー・ランジェリー", "レッグウェア", "タイツ・ストッキング", "レギンス・スパッツ・トレンカ", "ソックス", "レッグウォーマー", "ルームシューズ", "その他レッグウェア", "水着", "ビキニ", "水着セット", "ワンピース水着", "タンキニ", "パッド・ヌーブラ", "トップス", "ボトムス", "パレオ", "ショーツ", "ラッシュガード", "ビーチグッズ", "その他水着", "浴衣(ゆかた)", "帯", "下駄", "小物", "浴衣(単品)", "浴衣(セット)", "その他浴衣(ゆかた)", "着物", "黒紋付・喪服", "黒留袖", "色留袖", "振袖", "訪問着", "附下", "小紋", "帯", "帯揚", "帯〆", "重ね衿", "半衿", "着付小物", "草履", "バッグ", "その他", "福袋", "2019年福袋", "2018年以前福袋", "スキンケア", "化粧水", "乳液", "クリーム", "美容液・オイル", "洗顔", "クレンジング", "スクラブ", "パック・マッサージ・マスク", "リップケア", "バーム", "アイクリーム", "美容器具・ダイエット器具", "炭酸・水素アイテム", "その他スキンケア", "ヘアケア", "シャンプー", "コンディショナー", "トリートメント", "スタイリング", "ウィッグ", "アウトバストリートメント", "その他ヘアケア", "ボディケア", "ボディローション", "ボディクリーム", "ボディオイル", "ボディウォッシュ", "スクラブ", "ハンドソープ", "ハンドクリーム", "フット", "アウトドア(日焼けどめ・虫よけ)", "その他ボディケア", "デリケートケア", "デリケートケア", "デオドラント", "エチケット", "その他デリケートケア", "バス用品", "ソープ", "バスオイル", "バスソルト", "バスミルク", "その他バス用品", "メイクアップ", "アイカラー", "ファンデーション", "コンシーラー", "アイライナー", "チーク", "フェイスパウダー", "メイク小物", "つけまつげ用品", "二重コスメ", "アイブロウ", "マスカラ", "下地・UVケア", "リップ・グロス", "ネイル", "ミラー", "化粧下地", "その他メイクアップ", "その他", "その他", "メイク・スキンケアキット", "トライアル/トラベルキット", "スペシャルキット", "キットその他", "アウター", "ベスト", "ブルゾン", "ポンチョ", "ガウン", "マウンテンパーカー", "スタジャン", "デニムジャケット", "ライダースジャケット", "ニットアウター", "テーラードジャケット", "ノーカラージャケット", "ミリタリージャケット", "レインコート", "Pコート", "スプリングコート", "トレンチコート", "ステンカラーコート", "チェスターコート", "ダッフルコート", "ウールコート", "モッズコート", "ダウンベスト", "ダウンジャケット/コート", "ムートンコート", "その他", "トップス", "タンクトップ", "カットソー", "Tシャツ", "ポロシャツ", "シャツ", "ニット", "カーディガン", "パーカー", "スウェット・トレーナー", "プルオーバー", "ジャージ", "その他", "ボトムス", "ショートパンツ", "ハーフパンツ", "ロングパンツ", "スキニー", "ワイドパンツ", "バギーパンツ", "チノパンツ", "カーゴパンツ", "ブーツカットパンツ", "オールインワン", "デニムパンツ", "デニムショートパンツ", "スウェットパンツ", "その他", "ルームウェア", "パジャマ・ルームウェア", "Tシャツ・カットソー", "プルオーバー", "カーディガン", "シャツ", "パーカー", "ショートパンツ", "ロングパンツ", "ガウン", "セットアップ", "バスローブ", "小物", "ブランケット", "レッグウェア", "その他", "スポーツウェア", "インナー", "トップス", "スカート", "パンツ", "ワンピース", "アウター", "シューズ", "レッグウェア", "バッグ/ポーチ", "スポーツグッズ", "サウナスーツ", "その他", "スーツ", "ジャケット(単品)", "パンツ(単品)", "スーツセット", "その他", "ブラックフォーマル・礼服・喪服", "ジャケット(単品)", "スーツパンツ(単品)", "セット", "その他", "シューズ", "スニーカー", "カジュアルシューズ", "サンダル", "ビジネスシューズ", "ブーツ", "レインシューズ", "ビーチサンダル", "シューケアグッズ", "その他", "バッグ・財布・小物入れ", "ショルダーバッグ", "ハンドバッグ", "トートバッグ", "リュック", "ボストンバッグ", "ボディバッグ・ウエストポーチ", "ポーチ", "クラッチバッグ", "カゴバッグ", "キャンバスバッグ", "キャリーケース", "メッセンジャーバッグ", "ドラムバッグ", "エコバッグ", "財布", "コインケース・札入れ", "カードケース", "パスケース", "名刺入れ", "ビジネスバッグ", "その他", "帽子", "ハット", "ニット帽", "ベレー帽", "キャップ", "キャスケット", "その他", "アクセサリー", "ピアス", "リング", "ネックレス", "ブレスレット・バングル", "その他", "ファッション雑貨", "ストール・マフラー", "スカーフ・バンダナ", "ネックウォーマー", "イヤーマフ", "サングラス", "メガネ", "ベルト・サスペンダー", "グローブ", "腕時計", "扇子", "傘", "キーケース・キーホルダー", "ハンカチ・ハンドタオル", "ブランケット", "ネクタイ", "ネクタイピン", "カフリンクス", "その他", "インナー", "ボクサーパンツ", "トランクス", "その他", "レッグウェア", "ソックス", "ルームシューズ", "その他", "水着", "水着", "トップス", "ラッシュガード", "ビーチグッズ", "その他", "浴衣", "帯", "下駄", "小物", "浴衣(単品)", "浴衣(セット)", "その他", "着物", "その他", "福袋", "福袋", "スキンケア", "化粧水", "乳液", "クリーム", "美容液・オイル", "洗顔", "クレンジング", "スクラブ", "パック・マッサージ・マスク", "リップケア", "バーム", "美容器具・ダイエット器具", "炭酸・水素アイテム", "その他", "ヘアケア", "シャンプー", "コンディショナー", "トリートメント", "スタイリング", "アウトバストリートメント", "その他", "ボディケア", "ボディローション", "ボディクリーム", "ボディオイル", "ボディウォッシュ", "スクラブ", "ハンドソープ", "ハンドクリーム", "フット", "アウトドア(日焼けどめ・虫よけ)", "その他", "バス", "ソープ", "バスオイル", "バスソルト", "バスミルク", "その他", "その他", "その他", "アウター", "ベスト", "ブルゾン", "ポンチョ", "ガウン", "マウンテンパーカー", "スタジャン", "デニムジャケット", "ライダースジャケット", "ニットアウター", "テーラードジャケット", "ノーカラージャケット", "ミリタリージャケット", "レインコート", "Pコート", "スプリングコート", "トレンチコート", "ステンカラーコート", "チェスターコート", "ダッフルコート", "ウールコート", "モッズコート", "ダウンベスト", "ダウンジャケット/コート", "ファーアウター", "ムートンコート", "その他", "トップス", "キャミソール", "チュニック", "ビスチェ", "チューブ・ベアトップ", "タンクトップ", "カットソー", "Ｔシャツ", "ポロシャツ", "シャツ", "ブラウス", "ニット", "カーディガン", "ボレロ", "パーカー", "スウェット・トレーナー", "プルオーバー", "アンサンブル", "トップス＋インナーセット", "ジャージ", "その他", "ワンピース", "ベアワンピース", "キャミワンピース", "ノースリワンピ", "カットワンピース", "シャツワンピース", "ニットワンピース", "ミニワンピース", "膝丈ワンピース", "マキシ・ロングワンピース", "オールインワン", "ドレス", "ワンピース＋トップスセット", "トップス＆ボトムセット", "その他", "スカート", "ミニスカート", "膝丈スカート", "ロングスカート", "タイトスカート", "フレアスカート", "デニムスカート", "ジャンスカ・サス付スカート", "その他", "パンツ", "デニムショートパンツ", "デニムパンツ", "ショートパンツ", "ハーフパンツ", "キュロット", "クロップドパンツ", "スキニー", "ロングパンツ", "レギパン", "スカパン", "チノパンツ", "タックパンツ", "カーゴパンツ", "ブーツカットパンツ", "ストレートパンツ", "サロペット", "ワイドパンツ", "バギーパンツ", "スウェットパンツ", "その他", "ルームウェア", "パジャマ・ルームウェア", "シャツ", "Tシャツ・カットソー", "パーカー", "プルオーバー", "カーディガン", "ショートパンツ", "ロングパンツ", "ワンピース", "オールインワン", "セットアップ", "ガウン", "バスローブ", "小物", "ヘアアクセサリー", "ウエストウォーマー", "アイマスク", "ブランケット", "ネックピロー", "レッグウェア", "その他", "スポーツウェア", "インナー", "スポーツブラ", "トップス", "スカート", "パンツ", "ワンピース", "アウター", "シューズ", "レッグウェア", "バッグ/ポーチ", "スポーツグッズ", "サウナスーツ", "その他", "スクールアイテム", "シャツ", "ベスト・カーディガン", "セーター・ジャケット", "スカート", "リボン・ネクタイ・靴下", "バッグ", "その他", "シューズ", "スニーカー", "サンダル", "フラットシューズ", "パンプス", "ブーティ", "ショートブーツ", "ブーツ", "ムートンブーツ", "ビーチサンダル", "ドレスシューズ", "シューケアグッズ", "レインシューズ", "その他", "バッグ・財布・小物入れ", "ショルダーバッグ", "ハンドバッグ", "トートバッグ", "リュック", "ボストンバッグ", "ボディバッグ・ウエストポーチ", "ポーチ", "クラッチバッグ", "カゴバッグ", "キャンバスバッグ", "キャリーケース", "メッセンジャーバッグ", "パーティーバッグ", "ドラムバッグ", "エコバッグ", "財布", "コインケース・札入れ", "カードケース", "パスケース", "名刺入れ", "その他", "帽子", "ハット", "ニット帽", "ベレー帽", "キャップ", "ツバ広帽", "キャスケット", "その他", "アクセサリー", "ピアス", "イヤリング", "リング", "ネックレス", "ブレスレット・バングル", "アンクレット", "ヘッドアクセサリー", "ブローチ", "チャーム", "その他", "ファッション雑貨", "ストール・マフラー", "スカーフ・バンダナ", "ネックウォーマー", "イヤーマフ", "サングラス", "メガネ", "ブランケット", "ベルト・サスペンダー", "グローブ", "腕時計", "扇子", "傘", "キーケース・キーホルダー", "ハンカチ・ハンドタオル", "ネクタイ", "ネクタイピン", "カフリンクス", "その他", "インナー", "ブラ", "ショーツ・パンティ", "ブラ＆ショーツセット", "アンダーウェア", "ボクサーパンツ", "トランクス", "その他", "レッグウェア", "タイツ・ストッキング", "レギンス", "ソックス", "レッグウォーマー", "ルームシューズ", "その他", "水着", "水着", "水着セット", "ワンピース水着", "タンキニ", "トップス", "ボトムス", "パレオ", "ショーツ", "ラッシュガード", "ビーチグッズ", "その他", "浴衣", "帯", "下駄", "小物", "浴衣(単品)", "浴衣(セット)", "その他", "着物", "その他", "福袋", "福袋", "スキンケア", "化粧水", "乳液", "クリーム", "美容液・オイル", "洗顔", "クレンジング", "スクラブ", "パック・マッサージ・マスク", "リップケア", "バーム", "その他", "ヘアケア", "シャンプー", "コンディショナー", "トリートメント"];
const status = ['予定商品', 'ささげ済み', '未公開', '予約販売', '予約販売停止', '販売中', 'SALE', '販売終了', 'ノベルティ', '公開終了'];
const publicStatus = ['予約販売', '予約販売停止', '販売中', 'SALE', '販売終了'];
const previewStatus = ['予約販売', '販売中',]
const itemDetailText = `<b>【デザイン】</b><br><span>・XLARGE×Championのコラボレーションアイテム。</span><br><span>・フロントにXLARGEのスタンダードロゴをプリントしたベーシックで使い勝手の良いデザイン。</span><br><span>・同色を使用したショートパンツ(101202031001)とのSET UP展開。</span><br><br><b>【スタイリング提案】</b><br><span>・シンプルなデザインのTシャツはオーバーサイズで、カーゴパンツなどを合わせたストリート感のあるコーディネートがオススメ。</span><br><br><b>【特徴】</b><br><span>・透け感:なし</span><br><span>・裏地:なし</span><br><span>・光沢:なし</span><br><span>・生地の厚さ:やや厚手</span><br><span>・伸縮性:なし</span><br><span>・シルエット:スタンダード</span><br><br><b>【CHAMPION】</b><br><span>1919年、サイモン・フェインブルームによってニューヨーク州ロチェスターに設立。</span><br><span>米軍の訓練用ウエアや大学のアスレチックウエアとして注目された後、数々のオフィシャルスポーツウエアやユニフォームを手がけることに。</span><br><span>チャンピオンのウエアは、デザインや機能性に優れ、プロリーグも愛用するハイクオリティーなアイテムとして愛され続けている。</span><br><br><br><b>【取り扱い注意事項】</b><br><span>素材の特性上、汗や雨に濡れた場合、色にじみ・移染の恐れが有ります。濡れた場合は素早く拭き取り乾かして下さい。</span><br><br><b>※この商品は海外配送対応を行っておりませんので、予めご了承ください。</b><br><b>※画像の商品は光の照射や角度により、実物と色味が異なる場合がございます。</b><br><b>また表示のサイズ感と実物は若干異なる場合もございますので、予めご了承ください。</b><br>`;
const itemTitleText = `【XLARGE×Champion】REVERSE WEAVE S/S TEE`;
let sizeTableText =
    `サイズ      |着丈(CB)    |肩巾     |身巾    |袖丈
S{}            |70.5            |44        |46.5    |17
M{}            |72              |47.5      |51.5   |17.5
L{}            |75.5            |51         |55.5   |19
XL{}           |79.5           |58        |60.5   |20`;
const imgList = [
    {
        src: 'https://calif.cc/img/item/XLE01/XLE0120M0040/XLE0120M0040_pz_a001.jpg',
        id: 'XLE0120M0040_pz_a001',
        title: '',
        alt: 'alt 123',
        representive: 'ブラック',
    },
    {
        src: 'https://calif.cc/img/item/XLE01/XLE0120M0040/XLE0120M0040_pz_a002.jpg',
        id: 'XLE0120M0040_pz_a002',
        title: 'モデル175cm',
        alt: 'alt hoge',
        representive: 'オレンジ',
    },
    {
        src: 'https://calif.cc/img/item/XLE01/XLE0120M0040/XLE0120M0040_pz_a003.jpg',
        id: 'XLE0120M0040_pz_a003.',
        title: 'モデル175cm',
        alt: 'alt piyo',
        representive: '',
    },
    {
        src: 'https://calif.cc/img/item/XLE01/XLE0120M0040/XLE0120M0040_pz_a004.jpg',
        id: 'XLE0120M0040_pz_a004',
        title: 'モデル175cm',
        alt: '',
        representive: '',
    },
    {
        src: 'https://calif.cc/img/item/XLE01/XLE0120M0040/XLE0120M0040_pz_a005.jpg',
        id: 'XLE0120M0040_pz_a005',
        title: 'モデル175cm',
        alt: '',
        representive: '',
    },
    {
        src: 'https://calif.cc/img/item/XLE01/XLE0120M0040/XLE0120M0040_pz_a006.jpg',
        id: 'XLE0120M0040_pz_a006',
        title: 'モデル175cm',
        alt: '',
        representive: '',
    },
    {
        src: 'https://calif.cc/img/item/XLE01/XLE0120M0040/XLE0120M0040_pz_a007.jpg',
        id: 'XLE0120M0040_pz_a007',
        title: 'モデル175cm',
        alt: '',
        representive: '',
    },
    {
        src: 'https://calif.cc/img/item/XLE01/XLE0120M0040/XLE0120M0040_pz_a008.jpg',
        id: 'XLE0120M0040_pz_a008',
        title: 'モデル175cm',
        alt: '',
        representive: '',
    }
];

const variants = [
    {
        color: 'ホワイト',
        color_id: 'xxx',
        size: [
            {
                label: 'S',
                stock: 10,
                reserveStock: 0,
                supplyPeriod: '',
                reseve: false,
                visible: true,
                jancode: '10492134123',
            },
            {
                label: 'M',
                stock: 3,
                reserveStock: 0,
                supplyPeriod: '',
                reseve: false,
                visible: true,
                jancode: '10492134123',
            },
            {
                label: 'L',
                stock: 0,
                reserveStock: 0,
                supplyPeriod: '',
                reseve: false,
                visible: true,
                jancode: '10492134123',
            },
            {
                label: 'XL',
                stock: 0,
                reserveStock: 0,
                supplyPeriod: '2020-09上旬',
                reseve: false,
                visible: true,
                jancode: '10492134123',
            }
        ]
    },
    {
        color: 'ブラック',
        color_id: 'yyy',
        size: [
            {
                label: 'S',
                stock: 10,
                reserveStock: 0,
                supplyPeriod: '',
                reseve: false,
                visible: true,
                jancode: '10492134123',
            },
            {
                label: 'M',
                stock: 3,
                reserveStock: 0,
                supplyPeriod: '',
                reseve: false,
                visible: true,
                jancode: '10492134123',
            },
            {
                label: 'L',
                stock: 0,
                reserveStock: 0,
                supplyPeriod: '',
                reseve: false,
                visible: true,
                jancode: '10492134123',
            },
            {
                label: 'XL',
                stock: 0,
                reserveStock: 0,
                supplyPeriod: '',
                reseve: false,
                visible: false,
                jancode: '10492134123',
            }
        ]
    },
    {
        color: 'オレンジ',
        color_id: 'zzz',
        size: [
            {
                label: 'ワンサイズ',
                stock: 0,
                reserveStock: 0,
                supplyPeriod: '',
                reseve: false,
                visible: true,
                jancode: '10492134123',
            }
        ]
    }
];
const variantsHeader = ['カラー', 'サイズ', '納入時期', '予約在庫', '在庫', '販売形式', '表示', 'JANコード'];
const relatedItems = ['', '', '', '', '', '', '', '', '', ''];
const sizeHeader = ['サイズ', '着丈(CB)', '肩巾', '身巾', '袖丈'];
export default function Detail() {
    let { id } = useParams();
    const editor = useRef(null);
    //states
    const [sd, setSasage] = useState(   //mainSatate localstorageがあればレストア 
        {
            brand: '',
            category: '',
            compareAt: 5000,
            detail: itemDetailText,
            preview: false,
            fabric: '麺100%',
            genre: '',
            productType: '予定商品',
            images: imgList,
            bsItemId: 'bsItemId',
            madeby: '中国',
            price: 6050,
            relatedItem: relatedItems,
            return: '',
            scheduled: false,
            small_genre: '',
            sizeTableHTML: '',
            sizeTableId: '',
            sizeTableText: sizeTableText,
            saleStart: '2020-08-10 10:00:00',
            comingSoonStart: '2020-08-1 12:00:00',
            title: itemTitleText,
            variant: variants,
            weight: '350',
            lastModified: new Date(),
        }
    );
    const [si, setSI] = React.useState(sd.images[0]);  //Selected Iamge
    const [flag, setFlag] = React.useState({ upload: false, sent: false });  // switch for upload mode and view Image mode
    const [supplyDate, setSupplyDate] = React.useState();
    const classes = useStyles();
    useEffect(() => {
        let options = [];
        options.push(<MenuItem value={'未定'}>未定</MenuItem>);
        options.push(<MenuItem value={'リリース中'}>リリース中</MenuItem>);
        options.push(<MenuItem value={'予定なし'}>予定なし</MenuItem>);
        for (var a = 0; a < 12; a++) {
            const currentDate = new Date(today.getFullYear(), today.getMonth() + a, today.getDate(), 0, 0, 0, 0);
            const jojun = formatDate(currentDate, 'YYYY-MM') + '上旬';
            options.push(<MenuItem value={jojun}>{jojun}</MenuItem>);
            const chujun = formatDate(currentDate, 'YYYY-MM') + '中旬';
            options.push(<MenuItem value={chujun}>{chujun}</MenuItem>);
            const gejun = formatDate(currentDate, 'YYYY-MM') + '下旬';
            options.push(<MenuItem value={gejun}>{gejun}</MenuItem>);
        }
        setSupplyDate(options);
        createSizeTableHTML();
    }, []);
    const handleImageSave = (event) => {
        console.log(event);
        const apiUrl = 'http://localhost:7071/api/etl/sasage';
        event.map(async function (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                let base64String = btoa(String.fromCharCode(...new Uint8Array(reader.result)));
                axios.post(apiUrl + '/imageupload', { path: file.path, data: base64String, type: file.type }, { 'Content-Type': file.type, })
                    .then(async function (response) {
                        console.log(response.data);
                        let json = {
                            src: 'https://bsimg.blob.core.windows.net/sasage/' + file.path,
                            id: file.path,
                            title: '',
                            alt: '',
                            representive: '',
                        };
                        let imgs = sd.images;
                        imgs.push(json);
                        setSasage({ ...sd, images: imgs });
                        setFlag({ upload: false });
                    }).catch(async function (err) {
                        console.log(err);
                    });
            }
            reader.readAsArrayBuffer(file);
        });
    }
    const sendSasage = (event) => {
        if (!flag.sent) {
            const apiUrl = 'http://localhost:7071/api/etl/sasage';
            axios.post(apiUrl + '/detailUpdate', JSON.stringify(sd, null, 4))
                .then(async function (response) {
                    console.log(response.data);
                    setFlag({ ...flag, sent: true });
                }).catch(async function (err) {
                    console.log(err);
                });
        }

    }
    const createSizeTableHTML = (event) => {
        let outputHTML = '<TABLE class="sizeTable">';
        if (sd.sizeTableText) {
            let text = sd.sizeTableText;
            let lines = text.split('\n');
            for (let a = 0; a < lines.length; a++) {
                outputHTML += "<TR>"
                let cols = lines[a].split('|');
                for (let b = 0; b < cols.length; b++) {
                    cols[b] = cols[b].replace(/\s/g, '')
                    if (a === 0) {
                        outputHTML += '<TH>';
                    } else {
                        outputHTML += "<TD>";
                    }
                    if (cols[b].match(/{|}/)) {
                        outputHTML += cols[b].replace(/{|}/g, '');
                    } else if (a === 0) {
                        outputHTML += cols[b];
                    } else {
                        outputHTML += cols[b] + "cm";
                    }
                    if (a === 0) {
                        outputHTML += "</TH>";
                    } else {
                        outputHTML += "</TD>";
                    }
                }
                outputHTML += "</TR>";
            }
            outputHTML += "</TABLE>";
        }
        setSasage({ ...sd, sizeTableHTML: outputHTML })
        console.log(sd);
    }
    const setValue = (event) => {
        //console.log(event);
        setSasage({ ...sd, [event.target.id]: event.target.value });
        //localStorage.setItem(sd);
    }
    const setNumric = (event) => {
        setSasage({ ...sd, [event.target.id]: parseInt(event.target.value) });
        //localStorage.setItem(sd);
    }
    const setChecked = (event) => {
        setSasage({ ...sd, [event.target.name]: event.target.checked });
        //localStorage.setItem(sd);
    }
    const setRepresentive = (event, newRepresentive) => {
        let images = sd.images;
        if (newRepresentive) {
            images[sd.images.indexOf(si)].representive = newRepresentive;
        } else {
            images[sd.images.indexOf(si)].representive = '';
        }
        setSasage({ ...sd, images: images });
        //localStorage.setItem(sd);
    };
    const setAlt = (event) => {
        sd.images[sd.images.indexOf(si)].alt = event.target.value;
        setSasage(sd);
        //localStorage.setItem(sd);
    }
    const setTitle = (event) => {
        sd.images[sd.images.indexOf(si)].title = event.target.value;
        setSasage(sd);
        //localStorage.setItem(sd);
    }
    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) { return; }
        let img = sd.images;
        img.splice(destination.index, 0, sd.images.splice(source.index, 1)[0])
        setSasage({ ...sd, images: img });
        //localStorage.setItem(sd);
    }
    const setDateTime = (date, target) => {
        let datetime = new Date(Date.parse(date));
        setSasage({ ...sd, [target]: datetime.toISOString() });
    }
    const changeVisible = (count, index) => {
        let vari = sd.variant;
        if (vari[count].size[index].visible) {
            vari[count].size[index].visible = false;
        } else {
            vari[count].size[index].visible = true;
        }
        setSasage({ ...sd, variant: vari });
        //localStorage.setItem(sd);
    }
    const setSupplyPeriod = (count, index, event) => {
        //console.log(sd['variant'][count]['size'][index]);
        //console.log(event.target.value)
        let vari = sd.variant;
        vari[count].size[index].supplyPeriod = event.target.value;
        setSasage({ ...sd, variant: vari });
    }
    const setVariantValue = (count, index, event) => {
        let vari = sd.variant;
        vari[count].size[index][event.target.id] = event.target.value;
        setSasage({ ...sd, variatnt: vari });
    }
    const changeSaleMode = (count, index) => {
        let vari = sd.variant;
        if (vari[count].size[index].reserve) {
            vari[count].size[index].reserve = false;
        } else {
            vari[count].size[index].reserve = true;
        }
        setSasage({ ...sd, variant: vari });
    }
    const setRelatedItem = (event, index) => {
        let ri = sd.relatedItem;
        ri[index] = event.target.value;
        setSasage({ ...sd, relatedItem: ri });
        //localStorage.setItem(sd);
    }
    const showUploader = (event) => {
        setFlag({ ...flag, upload: true })
    }
    const showImage = (event) => {
        setFlag({ ...flag, upload: false })
    }
    const selectImage = (item) => {
        setSI(item);
        setFlag({ ...flag, upload: false });
    }
    const deleteImage = () => {
        let imgList = sd.images;
        imgList.splice(sd.images.indexOf(si), 1);
        setSasage({ ...sd, images: imgList });
        setSI(imgList[0]);
    }
    const calcRatio = () => {
        if (sd.compareAt) {
            let result = sd.price / sd.compareAt;
            console.log(result);
        }
    }
    //console.log(sd);  //state
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container fixed>
                <Box className={classes.verticalSpace}></Box>
                <Box>
                    <Grid container>
                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={6} >
                                    <Link to={'/'}>
                                        <Button>
                                            <ArrowBack />
                                            <Typography variant={'body1'}> ささげ一覧に戻る </Typography>
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={6} className={classes.right}>
                                    <IconButton onClick={showImage}>
                                        <Image color={flag.upload ? 'none' : 'primary'} />
                                    </IconButton>
                                    <IconButton onClick={showUploader}>
                                        <Backup color={flag.upload ? 'primary' : 'none'} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container spacing={1}>
                    <Grid item xs={6}>

                        <Box className={classes.border} padding={3}>
                            {flag.upload ?
                                <div>
                                    <DropzoneArea
                                        onChange={handleImageSave}
                                        acceptedFiles={['image/jpeg', 'image/png', 'image/gif']}
                                        maxFileSize={1024 * 1024 * 50}
                                        dropzoneText={'ファイルをここにドロップまたはクリックで参照して選ぶ'}
                                        filesLimit={1}
                                    />
                                </div>
                                :
                                <div>
                                    <Box className={classes.mainImage}>
                                        <ReactImageMagnify {...{
                                            smallImage: {
                                                alt: si.alt,
                                                src: si.src,
                                                isFluidWidth: true,
                                            },
                                            largeImage: {
                                                src: si.src,
                                                width: 1200,
                                                height: 1800
                                            }
                                        }} />
                                    </Box>
                                    <Box>
                                        <Grid container>
                                            <Grid item xs={9}>
                                                <ToggleButtonGroup
                                                    key={si.id}
                                                    value={si.representive}
                                                    onChange={setRepresentive}
                                                    exclusive
                                                    aria-label="text formatting">
                                                    {sd.variant.map((v, idx) => (
                                                        <ToggleButton key={"color-" + idx} value={v.color}>
                                                            <Typography>{v.color}</Typography>
                                                        </ToggleButton>
                                                    ))}
                                                </ToggleButtonGroup>
                                            </Grid>
                                            <Grid item xs={3} className={classes.right}>
                                                <IconButton onClick={deleteImage}>
                                                    <Delete color="secondary" />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <TextField id={'title-' + si.id} label="モデル情報" variant="standard" fullWidth defaultValue={si.title} onChange={setTitle} className={classes.textField} />
                                    <TextField id={'alt-' + si.id} label="ALT 文言" variant="standard" fullWidth defaultValue={si.alt} onChange={setAlt} className={classes.textField} />
                                </div>
                            }
                            <Box className={classes.verticalSpace} />
                            {/* image Tile  */}
                            <Container className={classes.gridList}>
                                <DragDropContext onDragEnd={onDragEnd} className={classes.gridList}>
                                    <Droppable droppableId="items" type="DraggableItem" direction="horizontal" className={classes.gridList}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{ display: "flex" }}
                                                ref={provided.innerRef}
                                            >
                                                {sd.images.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(fromprovided, fromsnapshot) => (
                                                            <div
                                                                ref={fromprovided.innerRef}
                                                                {...fromprovided.draggableProps}
                                                                {...fromprovided.dragHandleProps}
                                                            >
                                                                <img src={item.src} alt={item.id} className={classes.gridImage} onClick={() => (selectImage(item))} />
                                                                <div className={classes.overlay}>
                                                                    <div> {item.title}</div>
                                                                    <div>{item.alt}</div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext >
                            </Container>
                        </Box>
                        <Box className={classes.verticalTiny}></Box>
                        <Box>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="templateSelectLabel">サイズテンプレート選択</InputLabel>
                                <Select
                                    labelId="templateSelectLabel"
                                    id="templateSelect"
                                    placeholder="サイズテンプレート"
                                    value={'none'}
                                    fullWidth
                                    width={400}
                                >
                                    <MenuItem key={"uno"} value="none">テンプレート選択なし</MenuItem>
                                    <MenuItem key={"dos"} value="templateGenre">テンプレートジャンル</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <TextField type="string"
                                multiline
                                rowsMax={5}
                                id="sizeTableText"
                                fullWidth
                                variant="filled"
                                onBlur={setValue}
                                className={classes.textField}
                                defaultValue={sd['sizeTableText']}
                            />
                            <Box className={classes.verticalTiny}></Box>
                            <Button variant="contained" color="primary" fullWidth onClick={createSizeTableHTML}><Typography variant="body1"> ↓サイズテーブル生成 </Typography></Button>
                            <Box className={classes.verticalTiny}></Box>
                            <div dangerouslySetInnerHTML={{ __html: sd.sizeTableHTML }} className={classes.sizeTable} />
                        </Box>
                        <Box className={classes.verticalSpace}></Box>
                        <Box>
                            <Grid container>
                                <Grid item xs={6}><TextField id="sizeTableName" label="サイズテーブルテンプレート名" variant="standard" fullWidth /></Grid>
                                <Grid item xs={6}><Button variant="contained" color="primary" fullWidth><Typography variant="body1"> サイズテーブルテンプレート保存 </Typography></Button></Grid>
                            </Grid>
                        </Box>
                        <Box className={classes.verticalSpace} />
                        <Typography>関連アイテム</Typography>
                        <Box className={classes.border}>
                            {relatedItems.map((itemId, idx) => (
                                <TextField id={'relatedItems-' + idx} label={'関連アイテムID-' + (idx + 1)} defaultValue={itemId} fullWidth onBlur={(event) => (setRelatedItem(event, idx))} className={classes.textField} />
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Container>
                            <Box>
                                <TextField id={'title'} label="タイトル" variant="standard" defaultValue={sd.title} onBlur={setValue} fullWidth className={classes.textField} />
                            </Box>
                            <Grid container>
                                <Grid item xs={4}>
                                    <TextField id="price" label="価格" variant="standard" fullWidth defaultValue={sd.price} onBlur={setNumric} className={classes.textField} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField id="compareAt" label="セール価格" variant="standard" fullWidth defaultValue={sd.compareAt} onBlur={setNumric} onChange={calcRatio} className={classes.textField} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField id="discountRatio" label="ディスカウント率" variant="standard" fullWidth defaultValue={sd.discountRatio} onBlur={setValue} className={classes.textField} />
                                </Grid>
                            </Grid>
                            <Box>
                                <Grid container >
                                    <Grid item xs={4}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel key="productTypeLabel">ステータス</InputLabel>
                                            <Select
                                                labelId="productTypeLabel"
                                                id="productType"
                                                fullWidth
                                                value={sd.productType}
                                                onChange={(event) => (setValue({ target: { id: 'productType', value: event.target.value } }))}
                                            >
                                                <MenuItem value="none"></MenuItem>
                                                {status.map((item, num) => (
                                                    <MenuItem value={item} key={'selection' + num}>{item}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                className={classes.datePicker}
                                                label={<Typography variant="subtitle2">販売開始日時指定</Typography>}
                                                control={
                                                    <Checkbox
                                                        checked={sd.scheduled}
                                                        onChange={setChecked}
                                                        name="scheduled"
                                                        disabled={publicStatus.includes(sd.productType) ? false : true}
                                                        color="primary"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                className={classes.datePicker}
                                                control={<KeyboardDatePicker
                                                    margin="normal"
                                                    id="saleStartDate"
                                                    label="販売開始日付"
                                                    format="yyyy-MM-dd"
                                                    value={new Date(Date.parse(sd.saleStart))}
                                                    onChange={(date) => (setDateTime(date, 'saleStart'))}
                                                    disabled={sd.scheduled ? false : true}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />}
                                            />
                                            <FormControlLabel
                                                className={classes.datePicker}
                                                control={
                                                    <KeyboardTimePicker
                                                        margin="normal"
                                                        id="salestartTime"
                                                        label="販売開始時刻"
                                                        ampm={false}
                                                        value={new Date(Date.parse(sd.saleStart))}
                                                        onChange={(date) => (setDateTime(date, 'saleStart'))}
                                                        disabled={sd.scheduled ? false : true}
                                                        className={classes.datePicker}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change time',
                                                        }}
                                                    />
                                                } />

                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                className={classes.datePicker}
                                                label={<Typography variant="subtitle2">告知開始日時指定 </Typography>}
                                                control={
                                                    <Checkbox
                                                        checked={sd.preview}
                                                        name="preview"
                                                        onChange={setChecked}
                                                        disabled={previewStatus.includes(sd.productType) ? false : true}
                                                        color="primary"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                className={classes.datePicker}
                                                control={<KeyboardDatePicker
                                                    margin="normal"
                                                    id="previewStartDate"
                                                    label="告知開始日付"
                                                    format="yyyy-MM-dd"
                                                    value={new Date(Date.parse(sd.comingSoonStart))}
                                                    onChange={(date) => (setDateTime(date, 'comingSoonStart'))}
                                                    disabled={sd.preview ? false : true}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />}
                                            />
                                            <FormControlLabel
                                                className={classes.datePicker}
                                                control={
                                                    <KeyboardTimePicker
                                                        margin="normal"
                                                        id="previewStartTime"
                                                        label="告知開始時刻"
                                                        ampm={false}
                                                        value={new Date(Date.parse(sd.comingSoonStart))}
                                                        onChange={(date) => (setDateTime(date, 'comingSoonStart'))}
                                                        disabled={sd.preview ? false : true}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change time',
                                                        }}
                                                    />
                                                } />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Grid>

                            </Box>
                            <Box>
                                <Typography variant="caption" style={{ color: 'red' }}>
                                    <div>[定型文]</div>
                                    <div>※こちらの商品は複数サイトで在庫を共有している為、商品の手配ができない場合はキャンセルとさせていただきます。</div>
                                    <div>また、ご注文確定後、取り寄せとなる場合はお届けにお時間を頂きます。</div>
                                    <div>キャンセルやお届けにお時間を頂く際は別途ご案内をお送りしますので予めご了承ください。</div>
                                </Typography>
                            </Box>
                            <Box className={classes.blue}>
                                <Editor
                                    id={"detail"}
                                    ref={editor}
                                    value={sd['detail']}
                                    config={{ readonly: false }}
                                    tabIndex={1} // tabIndex of textarea
                                    onBlur={(obj) => {
                                        if (obj && obj !== "") { setValue({ target: { value: obj, name: 'detail' } }) }
                                    }}
                                />
                            </Box>
                            <Box>
                                <Box>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="brand-select">ブランド</InputLabel>
                                        <Select
                                            labelId="brand-select"
                                            id="brand"
                                            defaultValue={sd['brand']}
                                            fullWidth
                                            onChange={setValue}
                                        >
                                            <MenuItem value="none"></MenuItem>
                                            {brand.map((item, num) => (
                                                <MenuItem value={item} key={num}>{item}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="big-genre">ジャンル</InputLabel>
                                        <Select
                                            labelId="big-genre"
                                            id="big-genre"
                                            defaultValue={sd['genre']}
                                            fullWidth
                                            onChange={setValue}
                                        >
                                            <MenuItem value="none"></MenuItem>
                                            {genre.map((item, cnt) => (
                                                <MenuItem value={item} key={cnt}>{item}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <TextField id="bsItemId" label="アイテムコード" variant="standard" fullWidth disabled={true} defaultValue={sd.bsItemId} onBlur={setValue} className={classes.textField} />
                                <TextField id="fabric" label="素材" variant="standard" fullWidth defaultValue={sd.fabric} onBlur={setValue} className={classes.textField} />
                                <TextField id="manifactured" label="原産国" variant="standard" fullWidth defaultValue={sd.madeby} onBlur={setValue} className={classes.textField} />
                                <TextField id="return" label="返品について" variant="standard" fullWidth defaultValue={sd.return} onBlur={setValue} className={classes.textField} />
                                <TextField id="weight" label="重量" variant="standard" fullWidth defaultValue={sd.weight} onBlur={setValue} className={classes.textField} />
                            </Box>
                        </Container>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            {variantsHeader.map((head, index) => (
                                <TableCell align="center" key={index}>{head}</TableCell>
                            ))}
                        </TableHead>
                        {variants.map((item, count) => (
                            <TableBody key={count}>
                                {
                                    item.size.map((vari, index) => (
                                        <TableRow key={item.color_id + "-" + index}>
                                            <TableCell align="center">{item.color}</TableCell>
                                            <TableCell align="center">{vari['label']}</TableCell>
                                            <TableCell align="center">
                                                <Select
                                                    name={"supp-" + count + '-' + + index}
                                                    value={sd['variant'][count]['size'][index]['supplyPeriod'] ? sd['variant'][count]['size'][index]['supplyPeriod'] : '未定'}
                                                    fullWidth
                                                    onChange={(event) => (setSupplyPeriod(count, index, event))}
                                                >
                                                    {supplyDate}
                                                </Select>
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField label="予約在庫" variant="standard" defaultValue={sd['variant'][count]['size'][index]['reserveStock']} onBlur={(event) => (setVariantValue(count, index, event))} className={classes.stockTextWidth} />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField label="在庫" variant="standard" defaultValue={sd['variant'][count]['size'][index]['stock']} onBlur={(event) => (setVariantValue(count, index, event))} className={classes.stockTextWidth} />
                                            </TableCell>
                                            <TableCell align="center">{vari['reserve'] ? <IconButton key={"visble-" + count + "-" + index} onClick={() => (changeSaleMode(count, index))}><AccessAlarm /></IconButton> :
                                                <IconButton key={"visible-" + count + "-" + index} onClick={() => (changeSaleMode(count, index))}><MonetizationOn /></IconButton>}</TableCell> <TableCell align="center">{sd.variant[count].size[index].visible ?
                                                    <IconButton key={"visblle-" + count + '-' + index} onClick={() => (changeVisible(count, index))}><Visibility /></IconButton>
                                                    : <IconButton key={"visible-" + count + '-' + index} onClick={() => (changeVisible(count, index))}><VisibilityOff /></IconButton>}
                                            </TableCell>
                                            <TableCell align="center">{vari['jancode']}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        ))}
                    </Table>
                </TableContainer>
                <Box className={classes.verticalSpace}></Box>
                <Collapse in={flag.sent}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setFlag({ ...flag, sent: false });
                                }}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                    > ささげ情報情報更新！</Alert>
                </Collapse>
                <Button variant="contained" color="primary" fullWidth onClick={sendSasage} disabled={flag.sent}><Typography variant="h5"> ささげ情報を保存 </Typography></Button>
                <Box className={classes.verticalSpace}></Box>
            </Container >

        </div >
    );
}

const formatDate = function (date, format) {
    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
    return format;
};
