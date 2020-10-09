import React, { Component } from "react";
import { View, Text, Button, Alert, Image, Dimensions } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Leaderboard from 'react-native-leaderboard'

/* Implemented by Paula Ruiz for Sprint 3 of the Jelly Bellies' Communiteer project. This code is
 *  heavily based on the open source project, 'react-native-leaderboard' at https://github.com/JoeRoddy/react-native-leaderboard
 */

const windowWidth = Dimensions.get('window').width;

export default class LeaderBoard extends Component {
     state = {
         globalData: [
             { name: 'We Tu Lo', score: null, iconUrl: 'https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg' },
             { name: 'Adam Savage', score: 12, iconUrl: 'https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png' },
             { name: 'Derek Black', score: 244, iconUrl: 'http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png' },
             { name: 'Erika White', score: 0, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-eskimo-girl.png' },
             { name: 'Jimmy John', score: 20, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
             { name: 'Joe Roddy', score: 69, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' },
             { name: 'Ericka Johannesburg', score: 101, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' },
             { name: 'Tim Thomas', score: 41, iconUrl: 'http://conserveindia.org/wp-content/uploads/2017/07/teamMember4.png' },
             { name: 'John Davis', score: 80, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-afro-guy.png' },
             { name: 'Tina Turner', score: 22, iconUrl: 'https://cdn.dribbble.com/users/223408/screenshots/2134810/me-dribbble-size-001-001_1x.png' },
             { name: 'Harry Reynolds', score: null, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsSlzi6GEickw2Ft62IdJTfXWsDFrOIbwXhzddXXt4FvsbNGhp' },
             { name: 'Betty Davis', score: 25, iconUrl: 'https://landofblogging.files.wordpress.com/2014/01/bitstripavatarprofilepic.jpeg?w=300&h=300' },
             { name: 'Lauren Leonard', score: 30, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-' },
         ],
         friendData: [
             { name: 'Tina Turner', score: 22, iconUrl: 'https://cdn.dribbble.com/users/223408/screenshots/2134810/me-dribbble-size-001-001_1x.png' },
             { name: 'Joe Roddy', score: 69, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' },
             { name: 'Ericka Johannesburg', score: 101, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' },
             { name: 'Tim Thomas', score: 41, iconUrl: 'http://conserveindia.org/wp-content/uploads/2017/07/teamMember4.png' },
         ],
         filter: 0,
         userRank: 1,
         user: {
             name: 'Tina Turner',
             score: 22,
         }
     };

     alert = (title, body) => {
        Alert.alert(
            title, body, [{text: 'OK', onPress: () => { } },],
            { cancelable: false }
        )
     }

     sort = (data) => {
        const sorted = data && data.sort((item1, item2) => {
        return item2.score - item1.score;
        })

        let userRank = sorted.findIndex((item) => {
        return item.name === this.state.user.name;
        })
        this.setState({ userRank: ++userRank});
        return sorted;
     }

     renderHeader() {
        return (
            <View colors={[, '#1da2c6', '#1695b7']}
                style={{ backgroundColor: '#2A9D8F', padding: 15, paddingTop: 20, alignItems: 'center' }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    marginBottom: 5, marginTop: 10
                }}>
                    <Text style={{ color: 'white', fontSize: 25, flex: 1, textAlign: 'right', marginRight: 40 }}>
                        {ordinal_suffix_of(this.state.userRank)}
                    </Text>
                    <Image style={{ flex: .66, height: 60, width: 60, borderRadius: 60 / 2 }}
                        source={{ uri: 'https://cdn.dribbble.com/users/223408/screenshots/2134810/me-dribbble-size-001-001_1x.png' }} />
                    <Text style={{ color: 'white', fontSize: 25, flex: 1, marginLeft: 40 }}>
                        {this.state.user.score}pts
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    marginBottom: 5, marginTop: 5
                  }}>
                  <Text style={{ fontSize: 25, color: 'white', }}>{this.state.user.name}</Text>
                 </View>
                <ButtonGroup
                    onPress={(x) => { this.setState({ filter: x }) }}
                    selectedIndex={this.state.filter}
                    buttons={['Global', 'Friends']}
                    containerStyle={{ height: 30, width: windowWidth/3 }} />
            </View>
        );
     }

    render() {
        const props = {
            labelBy: 'name',
            sortBy: 'score',
            data: this.state.filter > 0 ? this.state.friendData : this.state.globalData,
            icon: 'iconUrl',
            onRowPress: (item, index) => {
                this.alert(item.name + " clicked", item.score + " points, wow!");
            },
            sort: this.sort,
            evenRowColor: '#edfcf9'
        };

        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                {this.renderHeader()}
                <Leaderboard {...props} />
            </View>
        )
    }

}

const ordinal_suffix_of = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}