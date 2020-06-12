import React from "react";
//import { useApi } from "./api";
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";

const buttons =
    "source,|,paragraph,font,fontsize,brush,|,bold,italic,underline,strikethrough,eraser,|,align,|,link,image,table";

const config = {
    language: "ja",
    readonly: false,
    minHeight: 250,
    width: "100%",
    enableDragAndDropFileToEditor: true,
    toolbarStickyOffset: 60,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    disablePlugins: "imageproperties",
    defaultActionOnPaste: "insert_clear_html",
    buttons: buttons,
    buttonsMD: buttons,
    buttonsSM: buttons,
    buttonsXS: buttons,
    controls: {
        font: {
            list: {
                "'ＭＳ ゴシック',sans-serif": "ＭＳ ゴシック",
                "'ＭＳ Ｐゴシック',sans-serif": "ＭＳ Ｐ ゴシック",
                "'ＭＳ 明朝',sans-serif": "ＭＳ 明朝",
                "'ＭＳ Ｐ明朝',sans-serif": "ＭＳ Ｐ 明朝",
                "Helvetica,sans-serif": "Helvetica",
                "Arial,Helvetica,sans-serif": "Arial",
                "Georgia,serif": "Georgia",
                "Impact,Charcoal,sans-serif": "Impact",
                "Tahoma,Geneva,sans-serif": "Tahoma",
                "'Times New Roman',Times,serif": "Times New Roman",
                "Verdana,Geneva,sans-serif": "Verdana"
            }
        }
    },
    uploader: {
        format: 'json',
        pathVariableName: 'path',
        filesVariableName: () => 'uploads',
        prepareData: function (data) {
            return data;
        },
        isSuccess: function (resp) {
            return !resp.error;
        },
        getMsg: function (resp) {
            console.log(resp);
            return resp.msg.join !== undefined ? resp.msg.join(' ') : resp.msg;
        },
        process: function (resp) {
            console.log(resp);
            return {
                images: resp.images ?? [],
                error: resp.error,
                msg: resp.msg
            };
        },
        error: function (e) {
            console.log(e);
            //this.events.fire('errorPopup', [e.getMessage(), 'error', 4000]);
        },
        defaultHandlerSuccess: function (data, resp) {
            console.log("Success");
            console.log(data);
            var i;
            if (data.images && data.images.length) {
                for (i = 0; i < data.images.length; i += 1) {
                    console.log("inserting " + data.images[i]);
                    this.jodit.selection.insertImage(data.images[i], undefined, null);
                }
            }
        },
        defaultHandlerError: function (resp) {
            console.log(resp);
            //this.events.fire('errorPopup', [this.options.uploader.getMsg(resp)]);
        }
    }
}

export default function Editor(props) {
    //const api = useApi();

    //config.uploader.url = api.baseUrl + "images";

    return (
        <JoditEditor
            value={props.value}
            config={config}
            onBlur={props.onBlur}
            onChange={props.onChange}
        />
    )
}
