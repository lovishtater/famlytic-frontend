'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { 
  PlusCircleIcon, 
  MagnifyingGlassIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { AddPersonModal } from './AddPersonModal';
import ContactImporter from './ContactImporter';
import { createPerson, createRelationship, apiService } from '@/services/api';
import { toast } from 'react-hot-toast';

interface FamilyMember {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  birthdate?: string;
  nickname?: string;
  gender?: 'male' | 'female' | 'other';
  isAlive: boolean;
  generation: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  connections: string[];
}

interface FamilyTreeData {
  nodes: FamilyMember[];
  links: Array<{
    source: string;
    target: string;
    relationship: 'parent' | 'child' | 'spouse' | 'sibling';
  }>;
}

export function FamilyTreeCanvas(): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusMember, setFocusMember] = useState<string | null>(null);
  const [isAddingPerson, setIsAddingPerson] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Family tree data - now loaded from backend
  const [familyData, setFamilyData] = useState<FamilyTreeData>({
    nodes: [],
    links: []
  });

  // Load family data from backend
  useEffect(() => {
    loadFamilyData();
  }, []);

  const loadFamilyData = async () => {
    try {
      setIsLoading(true);
      
      // Load both people and relationships
      const [peopleResponse, relationshipsResponse] = await Promise.all([
        apiService.getPeople(),
        apiService.getAllRelationships()
      ]);
      
      if (peopleResponse.success && peopleResponse.data) {
        const people = peopleResponse.data || [];
        
        // Transform backend data to frontend format
        const nodes: FamilyMember[] = people.map((person: any, index: number) => ({
          id: person.id,
          name: person.name,
          firstName: person.firstName,
          lastName: person.lastName,
          photo: person.photo,
          birthdate: person.birthdate,
          nickname: person.nickname,
          gender: person.gender,
          isAlive: person.isAlive,
          generation: index === 0 ? 0 : Math.floor(Math.random() * 3) - 1, // Temporary random generation
          connections: []
        }));

        // Load relationships from backend
        let links: Array<{ source: string; target: string; relationship: 'parent' | 'child' | 'spouse' | 'sibling' }> = [];
        
        if (relationshipsResponse.success && relationshipsResponse.data) {
          const relationships = relationshipsResponse.data;
          
          // Transform backend relationships to frontend format
          links = relationships.map((rel: any) => {
            // Map relationship types from backend to frontend
            let relationshipType: 'parent' | 'child' | 'spouse' | 'sibling';
            switch (rel.type) {
              case 'PARENT_OF':
                relationshipType = 'parent';
                break;
              case 'CHILD_OF':
                relationshipType = 'child';
                break;
              case 'SPOUSE_OF':
                relationshipType = 'spouse';
                break;
              case 'SIBLING_OF':
                relationshipType = 'sibling';
                break;
              default:
                relationshipType = 'parent'; // fallback
            }
            
            return {
              source: rel.personA,
              target: rel.personB,
              relationship: relationshipType
            };
          });
        }
        
        setFamilyData({ nodes, links });
        
        if (nodes.length > 0) {
          setFocusMember(nodes[0]?.id || null);
        }
      }
    } catch (error) {
      console.error('Failed to load family data:', error);
      toast.error('Failed to load family data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPerson = async (personData: {
    name: string;
    nickname?: string;
    birthdate?: string;
    relationship: string;
    notes?: string;
  }) => {
    try {
      // Create person in backend
      const response = await apiService.createPerson({
        name: personData.name,
        nickname: personData.nickname || undefined,
        birthdate: personData.birthdate || undefined,
        description: personData.notes || undefined,
        isAlive: true
      });

      if (response.success && response.data) {
        const newPerson = response.data;
        
        // Add to local state
        const newNode: FamilyMember = {
          id: newPerson.id,
          name: newPerson.name,
          firstName: newPerson.firstName,
          lastName: newPerson.lastName,
          photo: newPerson.photo,
          birthdate: newPerson.birthdate,
          nickname: newPerson.nickname,
          gender: newPerson.gender,
          isAlive: newPerson.isAlive,
          generation: 0, // Will be calculated properly later
          connections: []
        };

        setFamilyData(prev => ({
          ...prev,
          nodes: [...prev.nodes, newNode]
        }));

        // If there's a focus member, create a relationship
        if (focusMember) {
          const relationshipResponse = await apiService.createRelationship({
            personA: focusMember,
            personB: newPerson.id,
            type: personData.relationship.toUpperCase() as 'PARENT_OF' | 'CHILD_OF' | 'SPOUSE_OF' | 'SIBLING_OF'
          });

          if (relationshipResponse.success) {
            // Reload family data to get the updated relationships
            await loadFamilyData();
            toast.success(`${personData.name} added to family tree with ${personData.relationship} relationship!`);
          } else {
            toast.error('Person created but failed to create relationship');
          }
        } else {
          toast.success(`${personData.name} added to family tree!`);
        }
      } else {
        toast.error('Failed to add person');
      }
    } catch (error) {
      console.error('Error adding person:', error);
      toast.error('Failed to add person');
    }
  };

  const handleContactsImported = (contacts: any[]) => {
    console.log('Contacts imported:', contacts);
    // Handle imported contacts - could add them to family tree
    toast.success(`${contacts.length} contacts imported!`);
  };

  const handleDeletePerson = async (personId: string, personName: string) => {
    if (!confirm(`Are you sure you want to delete ${personName}? This will also remove all their relationships.`)) {
      return;
    }

    try {
      const response = await apiService.deletePerson(personId);
      
      if (response.success) {
        // Reload family data to reflect the deletion
        await loadFamilyData();
        toast.success(`${personName} has been deleted from the family tree`);
      } else {
        toast.error('Failed to delete person');
      }
    } catch (error) {
      console.error('Error deleting person:', error);
      toast.error('Failed to delete person');
    }
  };

  useEffect(() => {
    if (!svgRef.current || isLoading) return;

    const svg = d3.select(svgRef.current);
    const container = svg.node()?.parentElement;
    if (!container) return;

    const width = 1200;
    const height = 800;

    svg.attr('width', width).attr('height', height);

    // Clear previous content
    svg.selectAll('*').remove();

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Create main group
    const g = svg.append('g');

    // Create force simulation
    const simulation = d3.forceSimulation(familyData.nodes)
      .force('link', d3.forceLink(familyData.links).id((d: any) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(familyData.links)
      .join('line')
      .attr('stroke', '#94a3b8')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    // Create nodes
    const node = g.append('g')
      .selectAll('g')
      .data(familyData.nodes)
      .join('g')
      .attr('class', 'person-node')
      .call(d3.drag<SVGGElement, FamilyMember>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x || 0;
          d.fy = d.y || 0;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }) as any);

    // Add circles for each person
    node.append('circle')
      .attr('r', 30)
      .attr('fill', (d) => {
        if (d.gender === 'male') return '#3B82F6';
        if (d.gender === 'female') return '#EC4899';
        return '#6B7280';
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('cursor', 'pointer');

    // Add person names
    node.append('text')
      .attr('dy', 45)
      .attr('text-anchor', 'middle')
      .text((d) => d.firstName || d.name.split(' ')[0] || '')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', '#374151');

    // Add birth year
    node.append('text')
      .attr('dy', 60)
      .attr('text-anchor', 'middle')
      .text((d) => d.birthdate ? new Date(d.birthdate).getFullYear().toString() : '')
      .style('font-size', '10px')
      .style('fill', '#6B7280');

    // Add delete button
    const deleteButton = node.append('g')
      .attr('class', 'delete-button')
      .attr('transform', 'translate(20, -20)')
      .style('opacity', 0)
      .style('cursor', 'pointer');

    deleteButton.append('circle')
      .attr('r', 12)
      .attr('fill', '#ef4444')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    deleteButton.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .text('×')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('fill', '#fff');

    // Show delete button on hover
    node.on('mouseenter', function() {
      d3.select(this).select('.delete-button').style('opacity', 1);
    })
    .on('mouseleave', function() {
      d3.select(this).select('.delete-button').style('opacity', 0);
    });

    // Handle delete button click
    deleteButton.on('click', function(event, d) {
      event.stopPropagation(); // Prevent node click
      handleDeletePerson(d.id, d.name);
    });

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    // Add click handlers
    node.on('click', (_, d) => {
      setFocusMember(d.id);
      toast.success(`Focused on ${d.name}`);
    });

    // Add right-click context menu for delete
    node.on('contextmenu', function(event, d) {
      event.preventDefault();
      if (confirm(`Delete ${d.name} from the family tree?`)) {
        handleDeletePerson(d.id, d.name);
      }
    });

  }, [familyData, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-family-600 mx-auto mb-4"></div>
          <p className="text-canvas-800">Loading family tree...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-canvas-50 to-canvas-100">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 z-10">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-canvas-400" />
          <input
            type="text"
            placeholder="Search family members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-canvas-200 focus:outline-none focus:ring-2 focus:ring-family-500 focus:border-transparent w-64 font-casual"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 z-10 flex space-x-3">
        <motion.button
          onClick={() => setIsAddingPerson(true)}
          className="p-3 bg-gradient-to-r from-warm-500 to-cozy-500 text-white rounded-xl shadow-lg hover:from-warm-600 hover:to-cozy-600 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusCircleIcon className="w-5 h-5" />
        </motion.button>
      </div>
      <ContactImporter
        onContactsImported={handleContactsImported}
      />

      {/* Family Tree SVG */}
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Focus Member Info */}
      {focusMember && (
        <div className="absolute bottom-4 left-4 z-10 max-w-xs">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-canvas-200">
            <h3 className="font-semibold text-canvas-800 mb-1 text-sm">Focus Member</h3>
            <p className="text-canvas-600 mb-1 text-sm truncate">
              {familyData.nodes.find(n => n.id === focusMember)?.name || 'Unknown'}
            </p>
            <p className="text-xs text-canvas-500 leading-tight">
              💡 Hover for delete button or right-click to delete
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-canvas-200">
          <div className="flex items-center space-x-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-canvas-800">{familyData.nodes.length}</div>
              <div className="text-canvas-600">Members</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-canvas-800">{familyData.links.length}</div>
              <div className="text-canvas-600">Relationships</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddPersonModal
        isOpen={isAddingPerson}
        onClose={() => setIsAddingPerson(false)}
        onAdd={handleAddPerson}
      />

 
    </div>
  );
}