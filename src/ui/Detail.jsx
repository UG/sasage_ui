import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Editor from '../editor';
import { CssBaseline, Typography, Container, Grid, Paper, Box, TextField, Button, MenuItem, FormControl, Select, InputLabel, TableBody, Table, TableCell, TableContainer, TableRow, TableHead } from '@material-ui/core/';
import { DropzoneArea } from 'material-ui-dropzone';
import { ArrowBack, Visibility, VisibilityOff } from '@material-ui/icons';
import { useParams, Link } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactImageMagnify from 'react-image-magnify';


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
    overlay: {
        textAlign: 'center',
        position: 'relative',
        bottom: 30,
        height: 30,
        background: 'rgba(0, 0, 0, 0.4)',
        color: '#f1f1f1',
        width: '100%',
        transition: '.5s ease',
        opacity: 1,
        fontSize: 12,
    }
}));
const brand = ["XLARGE", "XLARGE USA", "MILKFED", "X-GIRL", "MILKFED(KIDS)", "MTG", "HUNTISM", "SILAS", "SILAS WOMEN", "SILAS OTHER", "MARIA OTHER", "X-GIRL STAGES FIRST STAGE", "X-GIRL STAGES NEXT STAGE", "XL-KIDS", "STITCH", "ADIDAS", "XG", "SARCASTIC", "AMONGST FRIENDS", "2K BY GINGHAM", "SNEAKER LAB", "NIKE", "NEW BALANCE", "REEBOK", "MILK CRATE", "ANYTHING", "VANS", "PUMA", "US VERSUS THEM", "ODD FUTURE", "DJ SHADOW", "COCOLO BLAND", "LADYS SHOES", "LAKAI MAIN", "LAKAI ANCHOR", "LAKAI ECHELON", "LAKAI STANDARD", "THE HILL SIDE ", "WHITE RAVEN", "Community Mill 雑貨", "Community Mill アパレル", "CONVERSE", "ASICS TIGER", "STANCE", "CHAMPION", "CANDIES", "MISFISH T", "NITTA KEIICHI", "GIZMOBIES", "OGURA", "FLATLUX", "TERUYA", "X-CLOSET ADIDAS ORIGINALS", "X-CLOSET", "店舗 OTHER", "CALIF OTHER", "営サ OTHER", "STYLES OTHER", "MONTAGE OTHER", "STITCH OTHER", "XG OTHER", "X-GIRL STAGES OTHER", "X-GIRL OTHER", "MILKFED OTHER", "XLARGE OTHER"];
const genre = ["アウター", "ベスト", "ブルゾン", "ポンチョ", "ガウン", "マウンテンパーカー", "スタジャン", "デニムジャケット・Gジャン", "ライダースジャケット", "ニットアウター", "テーラードジャケット", "ノーカラージャケット", "ミリタリージャケット", "レインコート", "Pコート", "スプリングコート", "トレンチコート", "ステンカラーコート", "チェスターコート", "ダッフルコート", "ウールコート", "モッズコート・ミリタリーコート", "ダウンベスト", "ダウンジャケット/コート", "ファーアウター", "ムートンコート", "その他アウター", "トップス", "キャミソール", "チュニック", "ビスチェ", "チューブトップ・ベアトップ", "タンクトップ", "カットソー", "Ｔシャツ", "ポロシャツ", "シャツ", "ブラウス", "ニット", "カーディガン", "ボレロ", "パーカー", "スウェット・トレーナー", "プルオーバー", "アンサンブル", "トップス＋インナーセット", "ジャージ", "その他トップス", "ワンピース", "ベアワンピース", "キャミワンピース", "ノースリーブワンピース", "カットワンピース", "シャツワンピース", "ニットワンピース", "ミニワンピース", "膝丈ワンピース", "マキシ丈・ロングワンピース", "オールインワン", "パーティードレス", "ワンピース・ドレス＋トップスセット", "トップス＆ボトムセット", "その他ワンピース", "スカート", "ミニスカート", "膝丈スカート", "ロングスカート", "タイトスカート", "フレアスカート", "デニムスカート", "ジャンパースカート・サス付スカート", "その他スカート", "パンツ", "デニムショートパンツ", "デニムパンツ・ジーンズ", "ショートパンツ", "キュロット", "クロップドパンツ", "ロングパンツ", "スキニーパンツ", "レギパン", "スカパン", "チノパンツ", "タックパンツ", "カーゴパンツ", "ストレートパンツ", "ワイドパンツ", "ブーツカットパンツ", "サロペット・オーバーオール", "スウェットパンツ", "その他パンツ", "部屋着・ルームウェア", "パジャマ・ルームウェア", "シャツ", "Tシャツ・カットソー", "パーカー", "プルオーバー", "カーディガン", "ショートパンツ", "ロングパンツ", "ワンピース", "オールインワン", "セットアップ", "ガウン", "バスローブ", "小物", "ヘアアクセサリー", "ウエストウォーマー", "アイマスク", "ブランケット", "ネックピロー", "レッグウェア", "その他部屋着・ルームウェア", "スポーツウェア", "インナー", "スポーツブラ", "トップス", "スカート", "パンツ", "ワンピース", "アウター", "シューズ", "レッグウェア", "バッグ/ポーチ", "スポーツグッズ", "サウナスーツ", "その他スポーツウェア", "スーツ", "ジャケット(単品)", "スカート(単品)", "スーツパンツ(単品)", "スーツセット", "その他スーツ", "ブラックフォーマル・礼服・喪服", "ジャケット(単品)", "スーツパンツ(単品)", "スカート(単品)", "ワンピース(単品)", "セット", "その他", "制服・スクールアイテム", "シャツ", "ベスト・カーディガン", "セーター・ジャケット", "スカート", "リボン・ネクタイ・靴下", "スクールバッグ", "その他制服・スクールアイテム", "オフィスカジュアル・事務服", "事務服", "その他", "シューズ(靴)", "スニーカー", "スリッポン", "サンダル", "フラットシューズ", "パンプス", "ブーティ", "ショートブーツ", "ミドルブーツ", "ロングブーツ", "ニーハイ・サイハイブーツ", "ドレスシューズ", "ムートンブーツ", "ビーチサンダル", "レインシューズ", "シューケアグッズ", "その他シューズ(靴)", "バッグ・財布・小物入れ", "ショルダーバッグ", "ハンドバッグ", "トートバッグ", "リュック", "ボストンバッグ", "ボディバッグ・ウエストポーチ", "ポーチ", "クラッチバッグ", "カゴバッグ", "キャンバスバッグ", "キャリーケース", "メッセンジャーバッグ", "パーティーバッグ", "ドラムバッグ", "エコバッグ", "財布", "コインケース・札入れ", "カードケース", "パスケース", "名刺入れ", "その他バッグ・財布・小物入れ", "帽子", "ハット", "ニット帽", "ベレー帽", "キャップ", "ツバ広帽", "キャスケット", "その他帽子", "アクセサリー", "ピアス", "イヤリング", "リング", "ネックレス", "ブレスレット・バングル", "アンクレット", "ヘッドアクセサリー", "ブローチ", "チャーム", "その他アクセサリー", "ファッション雑貨", "ストール・マフラー・スヌード", "スカーフ・バンダナ", "ネックウォーマー", "イヤーマフ", "サングラス", "メガネ", "ブランケット", "ベルト・サスペンダー", "グローブ", "腕時計", "扇子", "傘", "キーケース・キーホルダー", "ハンカチ・ハンドタオル", "その他ファッション雑貨", "インナー・ランジェリー", "ブラジャー", "ショーツ・パンティ", "ブラ＆ショーツセット", "ヌーブラ", "アンダーウェア", "Tバック・ソング", "ブラ＆Tバックセット", "ベビードール", "ガードル", "補正下着・シェイプファンデ", "ブライダルインナー", "サニタリーショーツ", "その他インナー・ランジェリー", "レッグウェア", "タイツ・ストッキング", "レギンス・スパッツ・トレンカ", "ソックス", "レッグウォーマー", "ルームシューズ", "その他レッグウェア", "水着", "ビキニ", "水着セット", "ワンピース水着", "タンキニ", "パッド・ヌーブラ", "トップス", "ボトムス", "パレオ", "ショーツ", "ラッシュガード", "ビーチグッズ", "その他水着", "浴衣(ゆかた)", "帯", "下駄", "小物", "浴衣(単品)", "浴衣(セット)", "その他浴衣(ゆかた)", "着物", "黒紋付・喪服", "黒留袖", "色留袖", "振袖", "訪問着", "附下", "小紋", "帯", "帯揚", "帯〆", "重ね衿", "半衿", "着付小物", "草履", "バッグ", "その他", "福袋", "2019年福袋", "2018年以前福袋", "スキンケア", "化粧水", "乳液", "クリーム", "美容液・オイル", "洗顔", "クレンジング", "スクラブ", "パック・マッサージ・マスク", "リップケア", "バーム", "アイクリーム", "美容器具・ダイエット器具", "炭酸・水素アイテム", "その他スキンケア", "ヘアケア", "シャンプー", "コンディショナー", "トリートメント", "スタイリング", "ウィッグ", "アウトバストリートメント", "その他ヘアケア", "ボディケア", "ボディローション", "ボディクリーム", "ボディオイル", "ボディウォッシュ", "スクラブ", "ハンドソープ", "ハンドクリーム", "フット", "アウトドア(日焼けどめ・虫よけ)", "その他ボディケア", "デリケートケア", "デリケートケア", "デオドラント", "エチケット", "その他デリケートケア", "バス用品", "ソープ", "バスオイル", "バスソルト", "バスミルク", "その他バス用品", "メイクアップ", "アイカラー", "ファンデーション", "コンシーラー", "アイライナー", "チーク", "フェイスパウダー", "メイク小物", "つけまつげ用品", "二重コスメ", "アイブロウ", "マスカラ", "下地・UVケア", "リップ・グロス", "ネイル", "ミラー", "化粧下地", "その他メイクアップ", "その他", "その他", "メイク・スキンケアキット", "トライアル/トラベルキット", "スペシャルキット", "キットその他", "アウター", "ベスト", "ブルゾン", "ポンチョ", "ガウン", "マウンテンパーカー", "スタジャン", "デニムジャケット", "ライダースジャケット", "ニットアウター", "テーラードジャケット", "ノーカラージャケット", "ミリタリージャケット", "レインコート", "Pコート", "スプリングコート", "トレンチコート", "ステンカラーコート", "チェスターコート", "ダッフルコート", "ウールコート", "モッズコート", "ダウンベスト", "ダウンジャケット/コート", "ムートンコート", "その他", "トップス", "タンクトップ", "カットソー", "Tシャツ", "ポロシャツ", "シャツ", "ニット", "カーディガン", "パーカー", "スウェット・トレーナー", "プルオーバー", "ジャージ", "その他", "ボトムス", "ショートパンツ", "ハーフパンツ", "ロングパンツ", "スキニー", "ワイドパンツ", "バギーパンツ", "チノパンツ", "カーゴパンツ", "ブーツカットパンツ", "オールインワン", "デニムパンツ", "デニムショートパンツ", "スウェットパンツ", "その他", "ルームウェア", "パジャマ・ルームウェア", "Tシャツ・カットソー", "プルオーバー", "カーディガン", "シャツ", "パーカー", "ショートパンツ", "ロングパンツ", "ガウン", "セットアップ", "バスローブ", "小物", "ブランケット", "レッグウェア", "その他", "スポーツウェア", "インナー", "トップス", "スカート", "パンツ", "ワンピース", "アウター", "シューズ", "レッグウェア", "バッグ/ポーチ", "スポーツグッズ", "サウナスーツ", "その他", "スーツ", "ジャケット(単品)", "パンツ(単品)", "スーツセット", "その他", "ブラックフォーマル・礼服・喪服", "ジャケット(単品)", "スーツパンツ(単品)", "セット", "その他", "シューズ", "スニーカー", "カジュアルシューズ", "サンダル", "ビジネスシューズ", "ブーツ", "レインシューズ", "ビーチサンダル", "シューケアグッズ", "その他", "バッグ・財布・小物入れ", "ショルダーバッグ", "ハンドバッグ", "トートバッグ", "リュック", "ボストンバッグ", "ボディバッグ・ウエストポーチ", "ポーチ", "クラッチバッグ", "カゴバッグ", "キャンバスバッグ", "キャリーケース", "メッセンジャーバッグ", "ドラムバッグ", "エコバッグ", "財布", "コインケース・札入れ", "カードケース", "パスケース", "名刺入れ", "ビジネスバッグ", "その他", "帽子", "ハット", "ニット帽", "ベレー帽", "キャップ", "キャスケット", "その他", "アクセサリー", "ピアス", "リング", "ネックレス", "ブレスレット・バングル", "その他", "ファッション雑貨", "ストール・マフラー", "スカーフ・バンダナ", "ネックウォーマー", "イヤーマフ", "サングラス", "メガネ", "ベルト・サスペンダー", "グローブ", "腕時計", "扇子", "傘", "キーケース・キーホルダー", "ハンカチ・ハンドタオル", "ブランケット", "ネクタイ", "ネクタイピン", "カフリンクス", "その他", "インナー", "ボクサーパンツ", "トランクス", "その他", "レッグウェア", "ソックス", "ルームシューズ", "その他", "水着", "水着", "トップス", "ラッシュガード", "ビーチグッズ", "その他", "浴衣", "帯", "下駄", "小物", "浴衣(単品)", "浴衣(セット)", "その他", "着物", "その他", "福袋", "福袋", "スキンケア", "化粧水", "乳液", "クリーム", "美容液・オイル", "洗顔", "クレンジング", "スクラブ", "パック・マッサージ・マスク", "リップケア", "バーム", "美容器具・ダイエット器具", "炭酸・水素アイテム", "その他", "ヘアケア", "シャンプー", "コンディショナー", "トリートメント", "スタイリング", "アウトバストリートメント", "その他", "ボディケア", "ボディローション", "ボディクリーム", "ボディオイル", "ボディウォッシュ", "スクラブ", "ハンドソープ", "ハンドクリーム", "フット", "アウトドア(日焼けどめ・虫よけ)", "その他", "バス", "ソープ", "バスオイル", "バスソルト", "バスミルク", "その他", "その他", "その他", "アウター", "ベスト", "ブルゾン", "ポンチョ", "ガウン", "マウンテンパーカー", "スタジャン", "デニムジャケット", "ライダースジャケット", "ニットアウター", "テーラードジャケット", "ノーカラージャケット", "ミリタリージャケット", "レインコート", "Pコート", "スプリングコート", "トレンチコート", "ステンカラーコート", "チェスターコート", "ダッフルコート", "ウールコート", "モッズコート", "ダウンベスト", "ダウンジャケット/コート", "ファーアウター", "ムートンコート", "その他", "トップス", "キャミソール", "チュニック", "ビスチェ", "チューブ・ベアトップ", "タンクトップ", "カットソー", "Ｔシャツ", "ポロシャツ", "シャツ", "ブラウス", "ニット", "カーディガン", "ボレロ", "パーカー", "スウェット・トレーナー", "プルオーバー", "アンサンブル", "トップス＋インナーセット", "ジャージ", "その他", "ワンピース", "ベアワンピース", "キャミワンピース", "ノースリワンピ", "カットワンピース", "シャツワンピース", "ニットワンピース", "ミニワンピース", "膝丈ワンピース", "マキシ・ロングワンピース", "オールインワン", "ドレス", "ワンピース＋トップスセット", "トップス＆ボトムセット", "その他", "スカート", "ミニスカート", "膝丈スカート", "ロングスカート", "タイトスカート", "フレアスカート", "デニムスカート", "ジャンスカ・サス付スカート", "その他", "パンツ", "デニムショートパンツ", "デニムパンツ", "ショートパンツ", "ハーフパンツ", "キュロット", "クロップドパンツ", "スキニー", "ロングパンツ", "レギパン", "スカパン", "チノパンツ", "タックパンツ", "カーゴパンツ", "ブーツカットパンツ", "ストレートパンツ", "サロペット", "ワイドパンツ", "バギーパンツ", "スウェットパンツ", "その他", "ルームウェア", "パジャマ・ルームウェア", "シャツ", "Tシャツ・カットソー", "パーカー", "プルオーバー", "カーディガン", "ショートパンツ", "ロングパンツ", "ワンピース", "オールインワン", "セットアップ", "ガウン", "バスローブ", "小物", "ヘアアクセサリー", "ウエストウォーマー", "アイマスク", "ブランケット", "ネックピロー", "レッグウェア", "その他", "スポーツウェア", "インナー", "スポーツブラ", "トップス", "スカート", "パンツ", "ワンピース", "アウター", "シューズ", "レッグウェア", "バッグ/ポーチ", "スポーツグッズ", "サウナスーツ", "その他", "スクールアイテム", "シャツ", "ベスト・カーディガン", "セーター・ジャケット", "スカート", "リボン・ネクタイ・靴下", "バッグ", "その他", "シューズ", "スニーカー", "サンダル", "フラットシューズ", "パンプス", "ブーティ", "ショートブーツ", "ブーツ", "ムートンブーツ", "ビーチサンダル", "ドレスシューズ", "シューケアグッズ", "レインシューズ", "その他", "バッグ・財布・小物入れ", "ショルダーバッグ", "ハンドバッグ", "トートバッグ", "リュック", "ボストンバッグ", "ボディバッグ・ウエストポーチ", "ポーチ", "クラッチバッグ", "カゴバッグ", "キャンバスバッグ", "キャリーケース", "メッセンジャーバッグ", "パーティーバッグ", "ドラムバッグ", "エコバッグ", "財布", "コインケース・札入れ", "カードケース", "パスケース", "名刺入れ", "その他", "帽子", "ハット", "ニット帽", "ベレー帽", "キャップ", "ツバ広帽", "キャスケット", "その他", "アクセサリー", "ピアス", "イヤリング", "リング", "ネックレス", "ブレスレット・バングル", "アンクレット", "ヘッドアクセサリー", "ブローチ", "チャーム", "その他", "ファッション雑貨", "ストール・マフラー", "スカーフ・バンダナ", "ネックウォーマー", "イヤーマフ", "サングラス", "メガネ", "ブランケット", "ベルト・サスペンダー", "グローブ", "腕時計", "扇子", "傘", "キーケース・キーホルダー", "ハンカチ・ハンドタオル", "ネクタイ", "ネクタイピン", "カフリンクス", "その他", "インナー", "ブラ", "ショーツ・パンティ", "ブラ＆ショーツセット", "アンダーウェア", "ボクサーパンツ", "トランクス", "その他", "レッグウェア", "タイツ・ストッキング", "レギンス", "ソックス", "レッグウォーマー", "ルームシューズ", "その他", "水着", "水着", "水着セット", "ワンピース水着", "タンキニ", "トップス", "ボトムス", "パレオ", "ショーツ", "ラッシュガード", "ビーチグッズ", "その他", "浴衣", "帯", "下駄", "小物", "浴衣(単品)", "浴衣(セット)", "その他", "着物", "その他", "福袋", "福袋", "スキンケア", "化粧水", "乳液", "クリーム", "美容液・オイル", "洗顔", "クレンジング", "スクラブ", "パック・マッサージ・マスク", "リップケア", "バーム", "その他", "ヘアケア", "シャンプー", "コンディショナー", "トリートメント"];
const itemDetailText = `<b>【デザイン】</b><br><span>・XLARGE×Championのコラボレーションアイテム。</span><br><span>・フロントにXLARGEのスタンダードロゴをプリントしたベーシックで使い勝手の良いデザイン。</span><br><span>・同色を使用したショートパンツ(101202031001)とのSET UP展開。</span><br><br><b>【スタイリング提案】</b><br><span>・シンプルなデザインのTシャツはオーバーサイズで、カーゴパンツなどを合わせたストリート感のあるコーディネートがオススメ。</span><br><br><b>【特徴】</b><br><span>・透け感:なし</span><br><span>・裏地:なし</span><br><span>・光沢:なし</span><br><span>・生地の厚さ:やや厚手</span><br><span>・伸縮性:なし</span><br><span>・シルエット:スタンダード</span><br><br><b>【CHAMPION】</b><br><span>1919年、サイモン・フェインブルームによってニューヨーク州ロチェスターに設立。</span><br><span>米軍の訓練用ウエアや大学のアスレチックウエアとして注目された後、数々のオフィシャルスポーツウエアやユニフォームを手がけることに。</span><br><span>チャンピオンのウエアは、デザインや機能性に優れ、プロリーグも愛用するハイクオリティーなアイテムとして愛され続けている。</span><br><br><br><b>【取り扱い注意事項】</b><br><span>素材の特性上、汗や雨に濡れた場合、色にじみ・移染の恐れが有ります。濡れた場合は素早く拭き取り乾かして下さい。</span><br><br><b>※この商品は海外配送対応を行っておりませんので、予めご了承ください。</b><br><b>※画像の商品は光の照射や角度により、実物と色味が異なる場合がございます。</b><br><b>また表示のサイズ感と実物は若干異なる場合もございますので、予めご了承ください。</b><br>`;
const itemTitleText = `<h1>【XLARGE×Champion】REVERSE WEAVE S/S TEE</h1><br>`;
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
                price: 6050,
                visible: true
            },
            {
                label: 'M',
                stock: 3,
                price: 6050,
                visible: true,
            },
            {
                label: 'L',
                stock: 0,
                price: 6050,
                visible: true,
            },
            {
                label: 'XL',
                stock: 0,
                price: 6050,
                visible: true,
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
                price: 6050,
                visible: true,
            },
            {
                label: 'M',
                stock: 3,
                price: 6050,
                visible: true,
            },
            {
                label: 'L',
                stock: 0,
                price: 6050,
                visible: true,
            },
            {
                label: 'XL',
                stock: 0,
                price: 6050,
                visible: false,
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
                price: 6050,
                visible: true,
            }
        ]
    }
];
const variantsHeader = ['カラー', 'サイズ', '価格', '在庫'];
function createData(size, length, shawl, hood, sleeve) {
    return { size, length, shawl, hood, sleeve };
}
const rows = [
    createData("S", "70.5cm", "44cm", "46.5cm", "17cm"),
    createData("M", "72cm", "47.5cm", "51.5cm", "17.5cm"),
    createData("L", "75.5cm", "51cm", "55.5cm", "19cm"),
    createData("XL", "79.5cm", "58cm", "60.5cm", "20cm"),
];
const relatedItems = ['', '', '', '', '', '', '', '', '', ''];
const sizeHeader = ['サイズ', '着丈(CB)', '肩巾', '身巾', '袖丈'];
export default function Detail() {
    let { id } = useParams();
    const editor = useRef(null)
    let [sd, setSasage] = useState(
        {
            title: '',
            titleExtend: itemTitleText,
            variant: variants,
            detail: itemDetailText,
            brand: '',
            genre: '',
            category: '',
            small_genre: '',
            fabric: '',
            madeby: '',
            jancode: '',
            return: '',
            weight: '',
            images: imgList,
            sizeTableHTML: '',
            sizeTableId: '',
            sizeTableText: sizeTableText,
            relatedItem: relatedItems
        }
    );
    const [si, setSI] = React.useState(sd.images[0]);
    const setRepresentive = (event, newRepresentive) => {
        if (newRepresentive) {
            sd.images[sd.images.indexOf(si)].representive = newRepresentive;
        } else {
            sd.images[sd.images.indexOf(si)].representive = '';
        }
        setSasage(sd);
    };
    const setAlt = (event) => {
        sd.images[sd.images.indexOf(si)].alt = event.target.value;
        setSasage(sd);
    }
    const setTitle = (event) => {
        sd.images[sd.images.indexOf(si)].title = event.target.value;
        setSasage(sd);
    }
    const getRep = () => {
        return sd.images[sd.images.indexOf(si)].representive;
    }
    const classes = useStyles();
    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) { return; }
        sd.images.splice(destination.index, 0, sd.images.splice(source.index, 1)[0]);
        setSasage(sd);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container fixed>
                <Box className={classes.verticalSpace}></Box>
                <Box>
                    <Link to={'/'}>
                        <Button>
                            <ArrowBack />
                            <Typography variant={'body1'}> ささげ一覧に戻る </Typography>
                        </Button>
                    </Link>
                </Box>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Box className={classes.border} padding={3}>
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
                                <ToggleButtonGroup
                                    key={sd.images[sd.images.indexOf(si).id]}
                                    value={getRep()}
                                    onChange={setRepresentive}
                                    exclusive
                                    aria-label="text formatting">
                                    <ToggleButton value="ホワイト" aria-label="white">
                                        <Typography>ホワイト</Typography>
                                    </ToggleButton>
                                    <ToggleButton value="ブラック" aria-label="black">
                                        <Typography>ブラック</Typography>
                                    </ToggleButton>
                                    <ToggleButton value="オレンジ" aria-label="orange">
                                        <Typography>オレンジ</Typography>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                            <TextField key={'title-' + si.id} label="モデル情報" variant="standard" fullWidth defaultValue={si.title} onChange={setTitle} />
                            <TextField key={'alt-' + si.id} label="ALT 文言" variant="standard" fullWidth defaultValue={si.alt} onChange={setAlt} />
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
                                                                <img src={item.src} alt={item.id} className={classes.gridImage} onClick={() => (setSI(item))} />
                                                                <div class={classes.overlay}>{item.title}</div>
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
                        <Box>
                            <TextField type="string"
                                multiline
                                rowsMax={5}
                                id="table_text"
                                fullWidth
                                variant="filled"
                                onChange={() => (setSasage(sd))}
                                defaultValue={sd['sizeTableText']}
                            />
                            <Box className={classes.verticalTiny}></Box>
                            <Button variant="contained" color="primary" fullWidth><Typography variant="body1"> ↓サイズテーブル生成 </Typography></Button>
                            <Box className={classes.verticalTiny}></Box>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            {sizeHeader.map((header, index) => (
                                                <TableCell align="center" key={header + '-' + index}>{header}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center">{row.size}</TableCell>
                                                <TableCell align="center">{row.length}</TableCell>
                                                <TableCell align="center">{row.shawl}</TableCell>
                                                <TableCell align="center">{row.hood}</TableCell>
                                                <TableCell align="center">{row.sleeve}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Box className={classes.verticalSpace}></Box>
                        <Box>
                            <Grid container>
                                <Grid item xs={6}><TextField id="temp_name" label="サイズテーブルテンプレート名" variant="standard" fullWidth /></Grid>
                                <Grid item xs={6}><Button variant="contained" color="primary" fullWidth><Typography variant="body1"> サイズテーブルテンプレート保存 </Typography></Button></Grid>
                            </Grid>
                        </Box>
                        <Box className={classes.verticalSpace} />
                        <Typography>関連アイテム</Typography>
                        <Box className={classes.border}>
                            {relatedItems.map((itemId, idx) => (
                                <TextField id={'relatedItems-' + idx} label={'関連アイテムID-' + (idx + 1)} defaultValue={itemId} fullWidth />
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Container>
                            <Box className={classes.orange}>
                                <TextField id="outlined-basic" label="Title" variant="standard" fullWidth />
                            </Box>
                            <Box className={classes.blue}>
                                <Editor
                                    id={"titleExtend"}
                                    ref={editor}
                                    value={sd['titleExtend']}
                                    config={{ readonly: false }}
                                    tabIndex={1} // tabIndex of textarea
                                    onBlur={newTitle => setSasage(sd)}
                                    onChange={newTitle => { }}
                                />
                            </Box>
                            <Box>
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
                                                            <TableCell align="center">{vari.price.toLocaleString() + "円（税込み）"}</TableCell>
                                                            <TableCell align="center">{vari['stock'] === 0 ? '在庫切れ' : vari['stock']}</TableCell>
                                                            <TableCell align="center">{vari['visible'] ? <Visibility /> : <VisibilityOff />}</TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        ))}
                                    </Table>
                                </TableContainer>
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
                                    onBlur={newDetail => setSasage(sd)}
                                    onChange={newDetail => { }}
                                />
                            </Box>
                            <Box>
                                <Box>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="brand-select">ブランド</InputLabel>
                                        <Select
                                            labelId="brand-select"
                                            id="brand"
                                            value={sd['brand']}
                                            fullWidth
                                            onChange={() => (setSasage(sd))}
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
                                            value={sd['genre']}
                                            fullWidth
                                            onChange={() => (setSasage(sd))}
                                        >
                                            <MenuItem value="none"></MenuItem>
                                            {genre.map((item, cnt) => (
                                                <MenuItem value={item} key={cnt}>{item}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <TextField id="fabric" label="素材" variant="standard" fullWidth />
                                <TextField id="manifactured" label="原産国" variant="standard" fullWidth value={'中国'} />
                                <TextField id="jancode" label="商品コード" variant="standard" fullWidth value={id} />
                                <TextField id="return" label="返品について" variant="standard" fullWidth />
                                <TextField id="weight" label="重量" variant="standard" fullWidth />
                            </Box>
                        </Container>
                    </Grid>
                </Grid>
                <Box className={classes.verticalSpace}></Box>
                <Button variant="contained" color="primary" fullWidth><Typography variant="h5"> ささげ情報を保存 </Typography></Button>
                <Box className={classes.verticalSpace}></Box>
            </Container>
        </div >
    );
}





