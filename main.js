const memberCount = document.getElementById("member-count");
const memberList = document.getElementById("member-list");
const memberTemplate = document.getElementById("member-template");

let members = [];
const member_url = `https://api.github.com/orgs/mobogreats-stuff/members`;


// update member list
function updateMemberList() {
    memberCount.textContent = members.length;

    // add members to the list
    for (const member of members) {
        const memberElement = memberTemplate.content.cloneNode(true);
        const memberAvatar = memberElement.querySelector(".member-avatar");
        const memberName = memberElement.querySelector(".member-username");
        const memberLink = memberElement.querySelector(".member-link");

        memberAvatar.src = member.avatar_url;
        memberAvatar.alt = `${member.login}'s avatar`;
        memberName.textContent = member.login;
        memberLink.href = member.html_url;
        memberList.appendChild(memberElement);
    }
}


// initial member fetch
async function getOrganizationMembers() {
    // fetch members
    const res = await fetch(member_url);
    const data = await res.json();


    // check for response errors
    if (data.message == undefined) {
        members = data;
        updateMemberList();
        return members
    } 
    else {
        throw new Error(data.message || 'Failed to fetch organization member count');
    }
}

// RUNTIME
getOrganizationMembers()