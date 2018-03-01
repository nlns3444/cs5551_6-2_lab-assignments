package com.google.firebase.quickstart.auth;

import android.app.SearchManager;
import android.content.Intent;
import android.net.Uri;
import android.view.LayoutInflater;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.google.android.flexbox.FlexboxLayout;
import com.ibm.watson.developer_cloud.visual_recognition.v3.model.DetectedFaces;
import com.ibm.watson.developer_cloud.visual_recognition.v3.model.ImageClassification;
import com.ibm.watson.developer_cloud.visual_recognition.v3.model.VisualClassification;
import com.ibm.watson.developer_cloud.visual_recognition.v3.model.VisualClassifier;

import java.util.List;
import java.util.Locale;

/**
 * Class used to construct a UI to deliver information received from Visual Recognition to the user.
 */
class RecognitionResultBuilder {

    private final MainActivity context;
    int imageCount = 0;

    RecognitionResultBuilder(MainActivity context) {
        this.context = context;
    }

    /**
     * Dynamically constructs a LinearLayout with information from Visual Recognition.
     * @return A LinearLayout with a dynamic number image_tag.xml
     */
    LinearLayout buildRecognitionResultView(VisualClassification visualClassification, DetectedFaces detectedFaces) {
        LinearLayout recognitionLayout = new LinearLayout(context);
        recognitionLayout.setOrientation(LinearLayout.VERTICAL);

        FlexboxLayout imageTagContainer = (FlexboxLayout)context.getLayoutInflater().inflate(R.layout.tag_box, null);

        // Next process general classification data from Visual Recognition and create image tags for each visual class.
        List<ImageClassification> classifications = visualClassification.getImages();

        for (int i = 0; i < classifications.size(); i++) {
            List<VisualClassifier> classifiers = classifications.get(i).getClassifiers();
            if (classifiers == null) break;
            for (int j = 0; j < classifiers.size(); j++) {
                //if (imageCount != 0)
                //    break;
                List<VisualClassifier.VisualClass> visualClasses = classifiers.get(j).getClasses();
                if (visualClasses == null) break;

                searchGoogle(visualClasses.get(0).getName());

                for (VisualClassifier.VisualClass visualClass : visualClasses) {
                    if (imageCount != 0)
                        break;
                    String formattedScore = String.format(Locale.US, "%.0f", visualClass.getScore() * 100) + "%";
                    imageTagContainer.addView(constructImageTag(context.getLayoutInflater(), visualClass.getName(), formattedScore));
                    imageCount++;
                }
            }
        }

        // If parsing through Visual Recognition's return has resulted in no image tags, create an "Unknown" tag.
        if (imageTagContainer.getChildCount() <= 0) {
            imageTagContainer.addView(constructImageTag(context.getLayoutInflater(), "Unknown", "N/A"));
        }

        recognitionLayout.addView(imageTagContainer);

        return recognitionLayout;
    }

    /**
     * Creates a TextView image tag with a name and score to be displayed to the user.
     * @param inflater Layout inflater to access R.layout.image_tag.
     * @param tagName Name of the tag to be displayed.
     * @param tagScore Certainty score of the tag, to be displayed when the user clicks the tag.
     * @return A TextView representation of the image tag.
     */
    static TextView constructImageTag(LayoutInflater inflater, final String tagName, final String tagScore) {
        TextView imageTagView = (TextView)inflater.inflate(R.layout.image_tag, null);
        imageTagView.setText(tagName);

        return imageTagView;
    }

    private void searchGoogle(String item) {
        Intent intent = new Intent(Intent.ACTION_WEB_SEARCH);
        intent.putExtra(SearchManager.QUERY, item); // query contains search string
        context.startActivity(intent);
    }

    private void searchGoogleBrowser(String item) {
        String stringURI = "http://www.google.com/#q=" + item;
        Uri uri = Uri.parse(stringURI);
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        context.startActivity(intent);
    }
}
