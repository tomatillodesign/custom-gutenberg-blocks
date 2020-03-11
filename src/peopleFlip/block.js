/**
 * Block dependencies
 */
import icons from './icons';
import './editor.css';
import './style.css';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
    registerBlockType,
} = wp.blocks;
const {
    Editable,
    MediaUpload,
    MediaUploadCheck,
    BlockControls,
    InspectorControls,
    RichText,
    URLInput,
    InnerBlocks,
} = wp.editor;
const {
    Button,
    SelectControl,
    RadioControl,
    Panel,
    PanelBody,
    PanelRow,
    TextControl,
    TextareaControl,
    RangeControl,
} = wp.components;
const { Fragment } = wp.element;

/**
 * Register example block
 */
export default registerBlockType(
    'cgb/people-flip',
    {
        title: __( 'People Flip', 'clbpeopleflip' ),
        description: __( 'Add a set of interactive People Flip cards to your content ', 'clbpeopleflip'),
        category: 'common',
	   icon: {
	        foreground: '#fff',
	        background: '#3883d6',
	        src: 'images-alt2',
	   },
        keywords: [ __( 'card' ), __( 'flipper' ), __( 'person' ) ],
        attributes: {
            columnNumber: {
                type: 'number',
                default: 2,
            },
            flippedCardHeight: {
                value: 'number',
                default: 400,
            },
        },
        edit: props => {
            const { attributes: { columnNumber, flippedCardHeight },
                className, setAttributes, isSelected } = props;

                const onChangeColumnNumber = columnNumber => { setAttributes( { columnNumber } ) };
                const onChangeflippedCardHeight = flippedCardHeight => { setAttributes( { flippedCardHeight } ) };

            return (
                 <Fragment>
                 <InspectorControls>
                   <PanelBody
                       title={ __( 'People Flip Settings', 'clbpeopleflip' ) }
                   >
                       <PanelRow>
                       <RangeControl
                            label="Number of Columns"
                            value={ columnNumber }
                            onChange={ onChangeColumnNumber }
                            min={ 1 }
                            max={ 4 }
                        />
                       </PanelRow>
                       <PanelRow>
                       <TextControl
                            label="Height of Flipped Cards (px)"
                            value={ flippedCardHeight }
                            onChange={ onChangeflippedCardHeight }
                            min={ 100 }
                            max={ 1200 }
                        />
                        </PanelRow>
                   </PanelBody>
               </InspectorControls>

               <div className={ className }>

               { isSelected ? (

                    <div className="cardset-selected">
                    <h4>People Flip Cards</h4>
                    <InnerBlocks
                         allowedBlocks={['cgb/person-flip']}
                    />
                    </div>

                            ) : (

                                 <div className="cardset-static">
                                        <h4>People Flip Cards</h4>
                                      <InnerBlocks
                                          allowedBlocks={['cgb/person-flip']}
                                     />

                                </div>

                            ) }
                </div>
                </Fragment>

            );
        },
        save: props => {
            const { columnNumber, flippedCardHeight } = props.attributes;

            let frSpacing = '1fr 1fr';
            if( columnNumber == 1) { frSpacing = '1fr'; }
            else if( columnNumber == 3) { frSpacing = '1fr 1fr 1fr'; }
            else if( columnNumber == 4) { frSpacing = '1fr 1fr 1fr 1fr'; }

            return (

                 // Try nesting a style for child flip cards, see: https://stackoverflow.com/a/10833154/5369381

                 <div className={ 'people-cards ' + ' columns-' + columnNumber}  data-card-height={flippedCardHeight} >
                    <InnerBlocks.Content />
                </div>

            );
        },
    },
);
