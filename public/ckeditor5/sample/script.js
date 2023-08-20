let initialData = "<h2>Bilingual Personality Disorder</h2>\n" +
        "      <figure class=\"image image-style-side\"><img src=\"https://c.cksource.com/a/1/img/docs/sample-image-bilingual-personality-disorder.jpg\">\n" +
        "       <figcaption>One language, one person.</figcaption>\n" +
        "      </figure>\n" +
        "      <p>\n" +
        "       This may be the first time you hear about this made-up disorder but\n" +
        "       it actually isn’t so far from the truth. Even the studies that were conducted almost half a century show that\n" +
        "       <strong>the language you speak has more effects on you than you realize</strong>.\n" +
        "      </p>\n" +
        "      <p>\n" +
        "       One of the very first experiments conducted on this topic dates back to 1964.\n" +
        "       <a href=\"https://www.researchgate.net/publication/9440038_Language_and_TAT_content_in_bilinguals\">In the experiment</a>\n" +
        "       designed by linguist Ervin-Tripp who is an authority expert in psycholinguistic and sociolinguistic studies,\n" +
        "       adults who are bilingual in English in French were showed series of pictures and were asked to create 3-minute stories.\n" +
        "       In the end participants emphasized drastically different dynamics for stories in English and French.\n" +
        "      </p>\n" +
        "      <p>\n" +
        "       Another ground-breaking experiment which included bilingual Japanese women married to American men in San Francisco were\n" +
        "       asked to complete sentences. The goal of the experiment was to investigate whether or not human feelings and thoughts\n" +
        "       are expressed differently in <strong>different language mindsets</strong>.\n" +
        "       Here is a sample from the the experiment:\n" +
        "      </p>\n" +
        "      <table>\n" +
        "       <thead>\n" +
        "        <tr>\n" +
        "         <th></th>\n" +
        "         <th>English</th>\n" +
        "         <th>Japanese</th>\n" +
        "        </tr>\n" +
        "       </thead>\n" +
        "       <tbody>\n" +
        "        <tr>\n" +
        "         <td>Real friends should</td>\n" +
        "         <td>Be very frank</td>\n" +
        "         <td>Help each other</td>\n" +
        "        </tr>\n" +
        "        <tr>\n" +
        "         <td>I will probably become</td>\n" +
        "         <td>A teacher</td>\n" +
        "         <td>A housewife</td>\n" +
        "        </tr>\n" +
        "        <tr>\n" +
        "         <td>When there is a conflict with family</td>\n" +
        "         <td>I do what I want</td>\n" +
        "         <td>It's a time of great unhappiness</td>\n" +
        "        </tr>\n" +
        "       </tbody>\n" +
        "      </table>\n" +
        "      <p>\n" +
        "       More recent <a href=\"https://books.google.pl/books?id=1LMhWGHGkRUC\">studies</a> show, the language a person speaks affects\n" +
        "       their cognition, behaviour, emotions and hence <strong>their personality</strong>.\n" +
        "       This shouldn’t come as a surprise\n" +
        "       <a href=\"https://en.wikipedia.org/wiki/Lateralization_of_brain_function\">since we already know</a> that different regions\n" +
        "       of the brain become more active depending on the person’s activity at hand. Since structure, information and especially\n" +
        "       <strong>the culture</strong> of languages varies substantially and the language a person speaks is an essential element of daily life.\n" +
        "      </p>";


ClassicEditor
	.create( document.querySelector( '.editor' ), {
        
	} )
	.then( editor => {
		window.editor = editor;
		editor.setData(initialData);
	} )
	.catch( handleSampleError );

function handleSampleError( error ) {
	const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

	const message = [
		'Oops, something went wrong!',
		`Please, report the following error on ${ issueUrl } with the build id "jem1zcof8drt-55dfo8cjzgs7" and the error stack trace:`
	].join( '\n' );

	console.error( message );
	console.error( error );
}
