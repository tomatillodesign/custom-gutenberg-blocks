/**
 * Block dependencies
 */
import icons from './icons';
import './editor.scss';
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
} = wp.components;
const { Fragment } = wp.element;

/**
 * Register example block
 */
export default registerBlockType(
    'cgb/person-flip',
    {
        title: __( 'Person Flip', 'clbpersonflip' ),
        description: __( 'Add single Person Flip card to your content ', 'clbpersonflip'),
        category: 'common',
        parent: ['cgb/people-flip'],
	   icon: {
	        foreground: '#fff',
	        background: '#3883d6',
	        src: 'images-alt2',
	   },
        keywords: [ __( 'card' ), __( 'flipper' ), __( 'person' ) ],
        attributes: {
            imgURL: {
                type: 'string',
            },
            imgID: {
                type: 'number',
            },
            imgAlt: {
                type: 'string',
                source: 'attribute',
                attribute: 'alt',
                selector: 'img',
           },
           personName: {
 			source: 'html',
 			selector: '.clb-person__name',
 		},
          personTitle: {
			source: 'html',
			selector: '.clb-person__title',
		},
          personBio: {
               source: 'html',
               selector: '.clb-person__bio',
          },
        },
        edit: props => {
            const { attributes: { imgID, imgURL, imgAlt, personName, personTitle, personBio },
                className, setAttributes, isSelected } = props;
            const onSelectImage = img => {
                setAttributes( {
                    imgID: img.id,
                    imgURL: img.url,
                    imgAlt: img.alt,
                } );
            };
            const onRemoveImage = () => {
                setAttributes({
                    imgID: null,
                    imgURL: null,
                    imgAlt: null,
                });
            }

            const onChangeName = personName => { setAttributes( { personName } ) };
            const onChangeTitle = personTitle => { setAttributes( { personTitle } ) };
            const onChangeBody = personBio => { setAttributes( { personBio } ) };

            return (
			  <Fragment>

			 <div className={ className }>

                    { ! imgID ? (

                         <Fragment>
					<MediaUploadCheck>
	                        <MediaUpload
	                            onSelect={ onSelectImage }
	                            type="image"
	                            value={ imgID }
	                            render={ ( { open } ) => (
	                                <Button
	                                    className={ "button button-large" }
	                                    onClick={ open }
	                                >
	                                    { __( 'Upload Person Image', 'clbpersonflip' ) }
	                                </Button>
	                            ) }
	                        >
	                        </MediaUpload>
				    </MediaUploadCheck>

                        <TextControl
                            className='clb-person__name'
                            label={ 'Name' }
                            value={ personName }
                            placeholder={ 'Name' }
                            onChange={ onChangeName }
                       />
                       <TextControl
                          className='clb-person__title'
                          label={ 'Title' }
                          value={ personTitle }
                          placeholder={ 'Title' }
                          onChange={ onChangeTitle }
                     />
                           <TextareaControl
                              className='clb-person__bio'
                              label={ 'Person Bio' }
                              value={ personBio }
                              placeholder={ 'Person Bio' }
                              onChange={ onChangeBody }
                           />

                         ) }

                       </Fragment>

                    ) : (

                         <div className ={ className }>

                         { isSelected ? (

                            <div className ={ className + "-selected" } >

                                <img
                                   src={ imgURL }
                                   alt={ imgAlt }
                                   className = "card-selected-image"
                                />

                                 <MediaUploadCheck>
                                    <MediaUpload
                                         onSelect={ onSelectImage }
                                         type="image"
                                         value={ imgID }
                                         render={ ( { open } ) => (
                                             <Button
                                                className={ "button button-large" }
                                                onClick={ open }
                                             >
                                                { __( 'Change Person Image', 'clbpersonflip' ) }
                                             </Button>
                                         ) }
                                    >
                                    </MediaUpload>
                               </MediaUploadCheck>

                               <TextControl
                                   className='clb-person__name'
                                   label={ 'Name' }
                                   value={ personName }
                                   placeholder={ 'Name' }
                                   onChange={ onChangeName }
                              />
                              <TextControl
                                 className='clb-person__title'
                                 label={ 'Title' }
                                 value={ personTitle }
                                 placeholder={ 'Title' }
                                 onChange={ onChangeTitle }
                            />
                             <TextareaControl
                                className='clb-person__bio'
                                label={ 'Person Bio' }
                                value={ personBio }
                                placeholder={ 'Person Bio' }
                                onChange={ onChangeBody }
                             />

                                   </div>

                            ) : (

                                 <div className="clb-card-static">
                                      <img
                                        src={ imgURL }
                                        alt={ imgAlt }
                                        className = "card-static-image"
                                     />
                                     <strong>{personName}</strong>
                                </div>

                            ) }

                            </div>

                    )}

                </div>
			 </Fragment>
            );
        },
        save: props => {
            const { imgID, imgURL, imgAlt, personName, personTitle, personBio } = props.attributes;

            return (

                 <div className={'person-card card-flip'}>

                      <div className="card-flip-inner">
                         <div className="flip-card-front" style={ {
							backgroundImage: `url(${ imgURL })`,
							backgroundSize: 'cover',
                                   backgroundPosition: 'center',
						} }>
                              <div className="clb-person__info-area">
                                   <h4 className="clb-person__name">{personName}</h4>
                                   <div className="clb-person__title">{personTitle}</div>
                              </div>
                         </div>
                              <div className="flip-card-back">
                                   <h4 className="clb-person__name">{personName}</h4>
                                   <div className="clb-person__bio">{personBio}</div>
                              </div>
                         </div>

                </div>
            );
        },
    },
);
