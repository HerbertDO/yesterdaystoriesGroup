import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function CreateStoryScreen({ navigation }) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [tagText, setTagText] = useState("");
    const [tags, setTags] = useState([]);

    const addTag = () => {
        if (tagText.trim() === "") return;
        setTags([...tags, tagText.trim()]);
        setTagText("");
    };

    return (
        <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 60 }}>
            <View style={styles.container}>
                <View style={styles.topNav}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image
                            source={require("../assets/weui_back-filled.png")}
                            style={{ width: 30, height: 40, resizeMode: "contain" }}
                        />
                    </TouchableOpacity>

                    <Image source={require("../assets/YSLogo.png")} style={styles.logo} />

                    <TouchableOpacity onPress={() => alert("Saved (demo)")}>
                        <Image
                            source={require("../assets/akar-icons_save.png")}
                            style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Story Details</Text>

                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter story title"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        placeholder="Enter your story description..."
                        value={desc}
                        onChangeText={setDesc}
                        multiline
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Photos</Text>
                    <TouchableOpacity style={styles.uploadBox} onPress={() => alert("Add media (demo)")}>
        
                        <Image
                            source={require("../assets/mdi-light_camera.png")}
                            style={styles.cameraIcon}
                        />
                        <Text style={{ color: "#666" }}>Tap to add video and images</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Location</Text>
                    <TouchableOpacity style={styles.locationBtn} onPress={() => alert("Add location (demo)")}>
                        <Image
                            source={require("../assets/mingcute_location-fill.png")}
                            style={styles.locationIcon}
                        />
                        <Text>Add Location</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Tags</Text>

                    <View style={styles.tagRow}>
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="Add a tag"
                            value={tagText}
                            onChangeText={setTagText}
                        />

                        <TouchableOpacity style={styles.addTagBtn} onPress={addTag}>
                            <Text style={{ color: "#fff" }}>Add</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.tagList}>
                        {tags.map((t, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setTags(tags.filter(tag => tag !== t))}
                            >
                                <Text style={styles.tag}>{t}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={{ alignItems: "flex-end", marginTop: 10 }}>
                    <TouchableOpacity style={styles.uploadBtn} onPress={() => alert("Story uploaded (demo)")}>
                        <Text style={{ color: "white" }}>Upload Story</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    body: { backgroundColor: "#f3efea" },
    container: {
        width: "100%",
        alignSelf: "center",
        backgroundColor: "#f3efea",
        padding: 18,
        borderRadius: 6,
    },
    topNav: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5,
    },
    icon: { fontSize: 26 },
    logo: { width: 55, height: 55, resizeMode: "contain", marginTop:40 },
    card: {
        backgroundColor: "#F5F2EF",
        padding: 18,
        borderRadius: 6,
        marginTop: 12,
        borderColor: "#B7B7B7",
        borderWidth: 0.2,
        elevation: 4,
    },
    cardTitle: { fontSize: 18, marginBottom: 10 },
    label: { marginTop: 10, fontSize: 12, color: "#444" },
    input: {
        width: "100%",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginTop: 6,
        fontSize: 14,
    },
    textarea: { height: 95, textAlignVertical: "top" },
    uploadBox: {
        borderWidth: 2,
        borderStyle: "dashed",
        backgroundColor: "#E4E4E4",
        borderColor: "#B7B7B7",
        borderRadius: 12,
        paddingVertical: 30,
        alignItems: "center",
    },
    cameraIcon: { width: 30, height: 30, marginBottom: 5 },
    locationBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF9F2",
        padding: 12,
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: "#dcd2c7",
        marginTop: 10,
    },
    locationIcon: { width: 30, height: 30, marginRight: 8 },
    tagRow: { flexDirection: "row", marginTop: 10 },
    addTagBtn: {
        marginLeft: 10,
        backgroundColor: "#A4A4A4",
        paddingHorizontal: 16,
        justifyContent: "center",
        borderRadius: 8, 
        marginTop: 6 
    },
    tagList: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
    tag: {
        backgroundColor: "#ececec",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginRight: 6,
        marginBottom: 6,
        fontSize: 12,
    },
    uploadBtn: {
        backgroundColor: "#475569",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 5,
    },
});